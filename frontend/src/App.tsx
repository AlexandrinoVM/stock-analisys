import './App.css'
import ProductsList from './features/products/components/ProductsList.js';
import { Button } from './components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
function App() {
  return (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Create Product</NavigationMenuLink>
                    <NavigationMenuLink>Delete Product</NavigationMenuLink>
                    <NavigationMenuLink>List Products</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Charts</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Line Chart</NavigationMenuLink>
                    <NavigationMenuLink>Bar Chart</NavigationMenuLink>
                    <NavigationMenuLink>Pie Chart</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            </NavigationMenu>
            
            
          <ProductsList />
          <Button>click me</Button>
          </>
  );
}

export default App
