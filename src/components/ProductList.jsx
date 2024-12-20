import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import '../Styles/ProductList.css';
import '../fontawesome/css/all.css';
import { useCart } from '../contexts/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errorPopup, setErrorPopup] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('tbl_produk')
                .select('*');
            if (error) console.error('Error fetching products:', error);
            else setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        setSelectedProduct(product);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedProduct(null);
        setQuantity(1);
    };

    const handleCloseErrorPopup = () => {
        setErrorPopup(false);
    };

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setQuantity(value > 0 ? value : 1); // Pastikan nilai minimal 1
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCartSubmit = () => {
        if (quantity > selectedProduct.stok) {
            setErrorPopup(true);
        } else {
            console.log('Ditambahkan ke keranjang:', selectedProduct, 'Jumlah:', quantity);
            addToCart(selectedProduct, quantity);
            handleClosePopup();
        }
    };

    return (
        <div className="product-list">
            <h1>Daftar Produk</h1>
            <div className="card-container">
                {products.map(product => (
                    <div className="card" key={product.id}>
                        <img className='gambarProduct' src={product.gambar} alt={product.name} />
                        <div>
                            <div className="namaBarang">
                               {product.name}
                            </div>
                           
                            <div className="hargaBarang">
                                Rp {product.price.toLocaleString('id-ID')},00
                            </div>
                            
                        </div>
                        <button className='btnBlue btn-max' onClick={() => handleAddToCart(product)}>
                                <i className="fa-solid fa-cart-plus"></i>
                            </button>
                    </div>
                ))}
            </div>
            {showPopup && selectedProduct && (
                <div className="popup-container">
                    <div className="popup-content">
                        <h2>Masukkan Keranjang</h2>
                        <img className='gambarProduct-add' src={selectedProduct.gambar} alt={selectedProduct.name} />
                        <p className='namaBarang'>{selectedProduct.name}</p>
                        <p className='hargaBarang'>Rp {selectedProduct.price.toLocaleString('id-ID')},00</p>
                         <div className='stok'>Stok tersedia: {selectedProduct.stok}</div>
                        <hr />
                        <label className='lbl-jumlah'>
                            Jumlah: 
                            <div className="quantity-controls">
                                <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                />
                                <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                            </div>
                        </label>
                        <button style={{backgroundColor:'blue'}} onClick={handleAddToCartSubmit}>Masukan Keranjang</button>
                        <button style={{backgroundColor: 'red'}} onClick={handleClosePopup}>Cancel</button>
                    </div>
                </div>
            )}
            {errorPopup && (
                <div className="popup-container">
                    <div className="popup-content">
                        <h2>Sorry!!</h2>
                        <p>Jumlah yang dimasukkan melebihi stok barang yang tersedia.</p>
                        <button style={{backgroundColor: 'red'}} onClick={handleCloseErrorPopup}>Tutup</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
