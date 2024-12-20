// src/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../supabaseClient';
import Header from '../components/header';
import '../fontawesome/css/all.css';
import '../Styles/resultsearch.css';
import { useCart } from '../contexts/CartContext'; 

const SearchResults = () => {
    const location = useLocation();
    const searchQuery = location.state?.query || '';

    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('tbl_produk')
                .select('*');

            if (error) console.error('Error fetching products:', error);
            else {
                const filteredProducts = data.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setProducts(filteredProducts);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    const handleAddToCart = (product) => {
        setSelectedProduct(product);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedProduct(null);
        setQuantity(1);
    };

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddToCartSubmit = () => {

        addToCart(selectedProduct, quantity); 
        handleClosePopup();
        console.log('Adding to cart:', selectedProduct, 'Quantity:', quantity); 
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <div className="product-list">
                    <h1>Hasil Pencarian untuk: {searchQuery}</h1>
                    <div className="card-container">
                        {products.length > 0 ? (
                            products.map(product => (
                                <div className="card" key={product.id}>
                                    <img className='gambarProduct' src={product.gambar} alt={product.name} />
                                    <div>
                                        <div className="namaBarang">
                                            {product.name}
                                        </div>
                                        <div className="hargaBarang">
                                            <p>Rp.{product.price.toFixed()}.-</p>
                                        </div>
                                        <button className="fa-solid fa-cart-plus btnBlue btn-max" onClick={() => handleAddToCart(product)}>
                                            
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Tidak ada hasil yang ditemukan.</p>
                        )}
                    </div>
                </div>

                {showPopup && selectedProduct && (
                <div className="popup-container">
                    <div className="popup-content">
                        <h2>Masukkan Keranjang</h2>
                        <img className='gambarProduct-add' src={selectedProduct.gambar} alt={selectedProduct.name} />
                        <p className='namaBarang'>{selectedProduct.name}</p>
                        <p className='hargaBarang'>Rp {selectedProduct.price.toFixed()},00</p>
                        <label>
                            Jumlah: 
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                        </label>
                        <button style={{backgroundColor:'blue'}} onClick={handleAddToCartSubmit}>Masukan Keranjang</button>
                        <button style={{backgroundColor: 'red'}} onClick={handleClosePopup}>Cancel</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default SearchResults;
