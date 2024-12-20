import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AdminDashboard from './pages/admin';
import SearchResults from './pages/resultsearch';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/regispage';
import CartPage from './pages/cartPages';
import AddProductPage from './pages/addProductsPage';
import CartProvider from './contexts/CartContext';
import AdminProducts from './pages/admProduckList';
import UsersPage from './pages/UsersPage';
import LaporanTransaksiPage from './pages/laporanPage';

const App = ()=> {
    return (
    
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path= "/login" element= {<LoginPage/>}/>
                    <Route path= "/register" element= {<RegisterPage/>}/>
                    <Route path='/cart' element= {<CartPage/>}/>
                    <Route path='/admin/addproduct' element= {<AddProductPage/>}/>
                    <Route path='/admin/products' element= {<AdminProducts/>}/>
                    <Route path='/admin/users' element= {<UsersPage/>}/>
                    <Route path='/admin/laporan' element= {<LaporanTransaksiPage/>}/>
                </Routes>
        
             </Router>
         </CartProvider>
            
    );
}

export default App;
