import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig';
import imageCompression from 'browser-image-compression'; // Impor library kompresi
import '../Styles/addProduct.css';
import supabase from '../supabaseClient';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [stok, setStok] = useState('');

    const generateProductId = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}${hour}${minute}${second}`;
    };

    const uploadImage = async (file, productId) => {
        return new Promise((resolve, reject) => {
            const fileExtension = file.name.split('.').pop();
            const newFileName = `${productId}.${fileExtension}`;
            const storageRef = ref(storage, `images/${newFileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error('Upload gagal:', error);
                    reject(new Error('Error upload gambar: ' + error.message));
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !stok) {
            alert('Tolong isi semua field');
            return;
        }

        setUploading(true);
        const productId = generateProductId();
        let uploadedImageUrl = '';

        if (image) {
            try {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 200,
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(image, options); 
                uploadedImageUrl = await uploadImage(compressedFile, productId);
            } catch (error) {
                console.error(error);
                alert('Error upload gambar: ' + error.message);
                setUploading(false);
                return;
            }
        }

        try {
            const { error } = await supabase
                .from('tbl_produk')
                .insert([{
                    id: productId,
                    name: name,
                    price: parseFloat(price),
                    gambar: uploadedImageUrl,
                    kategori: category,
                    stok: parseInt(stok),
                    
                }]);

            if (error) throw new Error(`Failed to add product: ${error.message}`);

            setName('');
            setPrice('');
            setImage(null);
            setCategory('');
            setStok('');
            alert('Item berhasil ditambahan');
        } catch (error) {
            console.error(error.message);
            alert('Error menambahkan item: ' + error.message);
        } finally {
            setUploading(false);
            setProgress(0); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <input type="number" 
                placeholder='Stok'
                value={stok}
                onChange={(e) => setStok(e.target.value)}
            />

            
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select Category</option>
                <option value="kosmetik">Kosmetik</option>
                <option value="ATK">ATK</option>
                <option value="Peralatan Rumah Tangga">Peralatan Rumah Tangga</option>
                <option value="Susu">Susu</option>
                <option value="Perawatan badan">Perawatan badan</option>
                <option value="dapur">Dapur</option>
                <option value="Perlengkapan bayi">Perlengkapan bayi</option>
                <option value="makanan ringan">Makanan ringan</option>
                <option value="makanan mentah">Makanan mentah</option>
            </select>

            <button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Tambah Produk'}
            </button>
            <p>Upload progress: {progress}%</p>
        </form>
    );
};

export default AddProduct;
