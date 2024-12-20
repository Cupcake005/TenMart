import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import Search from './search'; // Impor komponen Search
import "../Styles/index.css";

const ProductListAdm = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    // const [newDescription, setNewDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [newStok, setNewStok] = useState('');

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

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Yakin hapus produk ini?');

        if (!confirmed) {
            return; 
        }

        const { error } = await supabase
            .from('tbl_produk')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Gagal hapus produk:', error);
            alert('Gagal hapus produk, silahkan coba lagi');
        } else {
            setProducts(products.filter(product => product.id !== id));
            alert('Produk berhasil dihapus.');
        }
    };

    const handleEdit = async (id) => {
        const { error } = await supabase
            .from('tbl_produk')
            .update({
                name: newName,
                price: parseFloat(newPrice),
                stok : parseInt(newStok),
                // description: newDescription,
            })
            .eq('id', id);

        if (error) console.error('edit gagal:', error);
        else {
            setProducts(products.map(product => 
                product.id === id ? { ...product, name: newName, price: parseFloat(newPrice), stok: parseInt(newStok)} : product
            ));
            setEditingProduct(null);
            console.log('Berhasil edit')
            alert('Edit Produk Berhasil');
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product.id);
        setNewName(product.name);
        setNewPrice(product.price);
        setNewStok(product.stok);
        
        
       
    };

    // Filter produk berdasarkan searchTerm
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
            <div className="product-list">
                <h1>Daftar Produk</h1>

                {/* Gunakan komponen Search */}
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <div className="card-container">
                    {filteredProducts.map((product) => (
                        <div className="card" key={product.id}>
                            <img 
                                src={product.gambar} // Ganti dengan URL gambar produk jika ada
                                alt={product.name}
                                className="gambarProduct"
                            />
                            <div className="container-produk">
                                <div className="namaBarang">{product.name}</div>
                                <div className="hargaBarang">Rp {product.price}</div>
                                <hr />
                                <div className='stok'>Stok: {product.stok}</div>
                                <p>{product.description}</p>
                                <button className='btnBlue btn-max' onClick={() => handleEditClick(product)}>Edit</button>
                                <button className='btnRed btn-max' onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal untuk Edit Produk */}
                {editingProduct && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit Product</h2>
                            <div className='containerEditImg'><img className='gambarProductEdit' src={products.find(product => product.id === editingProduct)?.gambar} alt="" /></div>
                            <div className='container'>
                                <input 
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Product Name"
                                />
                                <input
                                    type="number"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    placeholder="Price"
                                />      
                                <input type="number"
                                    value={newStok}
                                    onChange={(e) => setNewStok(e.target.value)}
                                    placeholder="Stok"
                                />                      
                            </div>
                            <button style={{backgroundColor:'blue',}}  onClick={() => handleEdit(editingProduct)}>Save</button>
                            <button style={{backgroundColor:'red',color:'white'}} onClick={() => setEditingProduct(null)}>Batal</button>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductListAdm;
 