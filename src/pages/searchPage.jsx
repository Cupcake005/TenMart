import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchButton'; // Pastikan path ini benar


const ProductList = () => {
    const [products, setProducts] = useState([]); // Menyimpan data produk
    const [filteredProducts, setFilteredProducts] = useState([]); // Menyimpan hasil pencarian
    const [loading, setLoading] = useState(true); // Menyimpan status loading
    const [error, setError] = useState(null); // Menyimpan error jika ada

    // Mengambil data dari database menggunakan useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://xashmdeipfwvynljxzdj.supabase.co/rest/v1/tbl_produk', {
                    headers: {
                        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhc2htZGVpcGZ3dnlubGp4emRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NzEzMjEsImV4cCI6MjAzMzM0NzMyMX0.6fnQhuEGMdfNixY4LQejmu7aHrUrdGkulBVlMdgvWMg',
                    },
                });
                const data = await response.json();
                
                setProducts(data); 
                setFilteredProducts(data);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Terjadi kesalahan saat mengambil data.'); 
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (query) => {
        console.log('Mencari:', query);

        
        const filtered = products.filter(product =>
            product.nama_barang.toLowerCase().includes(query.toLowerCase())
        );

        
        setFilteredProducts(filtered);
    };

    if (loading) {
        return <p>Loading data...</p>; 
    }

    if (error) {
        return <p>{error}</p>; 
    }

    return (
        <div>
            <h1>Daftar Produk</h1>
            <SearchBar onSearch={handleSearch} />
            
           
            {filteredProducts.length > 0 ? (
                <ul>
                    {filteredProducts.map(product => (
                        <li key={product.id_barang}>
                            {product.nama_barang} - Rp{product.harga}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Produk tidak ditemukan.</p>
            )}
        </div>
    );
};

export default ProductList;
