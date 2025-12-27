// src/components/layout/Navbar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

const navigation = [
  { name: "home", href: "/" },
  { name: "Add Product", href: "/add_product" },
  { name: "Delete Product", href: "/delete_product" },
  { name: "Entry Product", href: "/entry_product" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const NavLinks = () => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname === item.href
              ? "bg-gray-900 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setOpen(false)} 
        >
          {item.name}
        </Link>
      ))}
    </>
  )

  return (
    <header className="border-b bg-white">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-bold">
          Stock Anlaisys
        </Link>

        
        <div className="hidden md:flex items-center space-x-4">
          <NavLinks />
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              <NavLinks />
              <Button onClick={handleLogout} variant="outline" className="w-full">
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}