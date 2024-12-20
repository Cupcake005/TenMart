import React, { useEffect, useState } from 'react';
import { toJpeg } from 'html-to-image';
import { storage, ref, uploadString, getDownloadURL } from '../firebaseConfig';
import supabase from '../supabaseClient';

const BtnPesan = ({ cartItems, totalPrice, noStruk }) => {

    // Ambil user ID dari header
    const [userId, setUserId] = useState(null);

    // Ambil user ID dari localStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const storedUserId = localStorage.getItem("ID_user");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    // Fungsi untuk mengurangi stok barang
    const updateStock = async (cartItems) => {
        try {
            for (const item of cartItems) {
                // Ambil data stok saat ini dari database
                const { data: product, error: fetchError } = await supabase
                    .from('tbl_produk')
                    .select('stok')
                    .eq('id', item.id)
                    .single();

                if (fetchError) {
                    console.error(`Gagal mengambil data stok untuk produk ID ${item.id}:`, fetchError);
                    continue;
                }

                // Hitung stok baru
                const newStock = product.stok - item.quantity;

                if (newStock < 0) {
                    console.warn(`Stok produk ID ${item.id} tidak mencukupi.`);
                    continue; // Lewati item jika stok tidak mencukupi
                }

                // Perbarui stok di database
                const { error: updateError } = await supabase
                    .from('tbl_produk')
                    .update({ stok: newStock })
                    .eq('id', item.id);

                if (updateError) {
                    console.error(`Gagal memperbarui stok untuk produk ID ${item.id}:`, updateError);
                } else {
                    console.log(`Stok untuk produk ID ${item.id} berhasil diperbarui menjadi ${newStock}.`);
                }
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat memperbarui stok:", error);
        }
    };

    const handlePrintReceipt = async () => {
        console.log('no struk: ', noStruk);
        const receiptNode = document.getElementById('receipt');
        if (!receiptNode) {
            console.error("Elemen struk tidak ditemukan!");
            return;
        }

        try {
            // Mengonversi receiptNode menjadi gambar PNG
            const dataUrl = await toJpeg(receiptNode);

            // Membuat id_transaksi dengan format trs(time(now))
            const transactionId = `trs-${new Date().getTime()}`;

            // Simpan gambar struk ke Firebase Storage
            const strukRef = ref(storage, `struk/${transactionId}.jpg`);
            await uploadString(strukRef, dataUrl, 'data_url');

            // Mendapatkan URL gambar dari Firebase Storage
            const imageUrl = await getDownloadURL(strukRef);

            // const today = new Date();
            // const yyyy = today.getFullYear();
            // const mm = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dengan dua digit
            // const dd = String(today.getDate()).padStart(2, '0'); // Hari dengan dua digit
            // const tanggal = `${yyyy}-${mm}-${dd}`; // Format: YYYY-MM-DD

            // Format data transaksi
            const transactionData = {
                id: transactionId,
                ID_user: userId || null,
                NoStruk: noStruk,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: totalPrice,
                // tgl_transaksi: tanggal
            };

            // Simpan transaksi ke database
            const { data, error } = await supabase
                .from('tbl_transaksi')
                .insert([transactionData]);

            if (error) {
                throw error;
            }

            console.log("Transaksi berhasil disimpan:", transactionData);

            // Kurangi stok barang setelah transaksi berhasil
            await updateStock(cartItems);

            

            // Kirim gambar ke WhatsApp admin
            const adminNumber = '6282256668107';
            const message = `Struk pesanan dengan total: Rp.${totalPrice}. \nKlik untuk melihat struk: ${imageUrl}`;
            const url = `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodeURIComponent(message)}`;

            window.open(url, '_blank');
            // Menghapus isi keranjang setelah transaksi berhasil
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalPrice');

            //arahkan ke home
            window.location.href = '/';
        } catch (error) {
            console.error("Terjadi kesalahan saat mencetak struk:", error);
        }
    };

    return (
        <button style={{ width: '100%', height: '50px', padding: '10px' }} className='btnBlue' onClick={handlePrintReceipt}>
            Cetak Struk dan Kirim ke WhatsApp
        </button>
    );
};

export default BtnPesan;
