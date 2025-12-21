
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/layouts/navbar/components/Navbar'
import Home from './pages/Home'
import ProductForm from './components/forms/createProduct/components/CreateProduct'
import DeleteProductForm from './components/forms/deleteProduct/components/DeleteProduct'
function App() {
  return (
     <>
     <Navbar />
    <div className=" flex-col items-center justify-center">
    
   
      <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/add_product" element={<ProductForm />} />
           <Route path="/delete_product" element={<DeleteProductForm />} />
      </Routes>
    </div>
    </>
  )
}

export default App