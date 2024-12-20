import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../Styles/Cart.css';
import '../Styles/keranjang.css';

import BtnPesan from '../components/btnPesan';
import Struk from '../components/Struk';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const [isCheckedOut, setIsCheckedOut] = useState(false);

    // Membuat nomor struk (12 digit acak)
    const [noStruk] = useState(Math.floor(100000000000 + Math.random() * 900000000000).toString());

    // Waktu transaksi untuk struk
    const transactionTime = new Date().toLocaleString(); // Mengambil waktu transaksi (hh:mm:ss dd/mm/yyyy)

    const handleCheckout = () => {
        setIsCheckedOut(true);
    };

    return (
        <div className="main-container">
            <div>
                {cartItems.length === 0 ? (
                    <p style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        Keranjang Anda kosong.
                    </p>
                ) : (
                    <div>
                        {!isCheckedOut ? (
                            <div className="container">
                                <div className="cart-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="cart-card">
                                            <div>
                                                <div>
                                                    <img
                                                        src={item.gambar}
                                                        alt={item.name}
                                                        className="gambar-cart"
                                                    />
                                                </div>
                                                <div style={{ marginTop: '20px' }}>
                                                    <button
                                                        className="cart-card-remove"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="cart-card-details">
                                                <h3 className="cart-card-name">{item.name}</h3>
                                                <p>Jumlah: {item.quantity}</p>
                                                <p>Harga: Rp.{item.price}</p>
                                                <p>Total: Rp.{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="cart-footer">
                                    <p className="total-harga">Total: Rp.{totalPrice}</p>
                                    <button className="btnBlue btn-max" onClick={handleCheckout}>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                
                                <Struk
                                    cartItems={cartItems}
                                    totalPrice={totalPrice}
                                    transactionTime={transactionTime}
                                    noStruk={noStruk} 
                                />
                                
                                <BtnPesan
                                    cartItems={cartItems}
                                    totalPrice={totalPrice}
                                    noStruk={noStruk}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
