import React, { createContext, useContext, useState } from 'react';


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        console.log("Menambahkan produk :", product.name); // Memastikan ID dari database
        

        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Jika produk sudah ada di keranjang, perbarui jumlahnya
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Jika produk belum ada, tambahkan ke keranjang
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        console.log("Menghapus produk dengan ID:", id); // Memastikan ID yang akan dihapus
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
