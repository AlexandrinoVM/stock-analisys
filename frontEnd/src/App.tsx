
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/layouts/navbar/components/Navbar'
import Home from './pages/Home'
import EntryProductPage from './pages/EntryProductPage'
import DeleteProductPage from './pages/DeleteProductPage'
import AddProductPage from './pages/AddProductPage'

function App() {
  return (
     <>
     <Navbar />
    <div className=" flex-col items-center justify-center">
      <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/add_product" element={<AddProductPage />} />
           <Route path="/delete_product" element={<DeleteProductPage />} />
           <Route path="/entry_product" element={<EntryProductPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App