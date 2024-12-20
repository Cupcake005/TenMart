import React, { useState, useEffect } from "react";
import LaporanTransaksi from "../components/laporaTransaksi";
import Headeradmin from "../components/headeradim";
import TanggalFilter from "../components/tanggalFiterLaporan";
import supabase from '../supabaseClient';
import '../Styles/laporanTransaksi.css';

const LaporanTransaksiPage = () => {
  const [startDate, setStartDate] = useState(() => {
    // Mengatur default tanggal mulai ke tanggal 1 awal bulan ini
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const firstDayOfMonth = `01 - ${mm}- ${yyyy}`;  // Tanggal 1 bulan ini
    return firstDayOfMonth;
  });

  const [endDate, setEndDate] = useState(() => {
    // Mengatur default tanggal akhir ke hari ini
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd} - ${mm} - ${yyyy}`;  // Tanggal hari ini
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0); // Menyimpan total uang

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tbl_transaksi")
        .select("id, ID_user, items, total, tgl_transaksi");

      if (error) throw error;

      // Filter transaksi berdasarkan tanggal
      let filteredData = data;

      if (startDate) {
        filteredData = filteredData.filter((transaction) => new Date(transaction.tgl_transaksi) >= new Date(startDate));
      }

      if (endDate) {
        filteredData = filteredData.filter((transaction) => new Date(transaction.tgl_transaksi) <= new Date(endDate));
      }

      setTransactions(filteredData);

      // Hitung total uang
      const total = filteredData.reduce((sum, transaction) => sum + transaction.total, 0);
      setTotalAmount(total);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [startDate, endDate]);

  const handlePrint = () => {
    window.print(); 
  };

  return (
    <div>
      <Headeradmin />
      <h1 style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>Halaman Laporan Transaksi</h1>
      <div className="container">
        <TanggalFilter
          onStartDateChange={setStartDate} 
          onEndDateChange={setEndDate} 
        />
        <div className="laporan-bulanan" style={{width:'100%'}}>
          {/* Judul Laporan */}
          <h3 className="container-omset">
            Total Omset dari tanggal {startDate} sampai {endDate}:
            <div style={{margin:'10px'}}><span>Rp {totalAmount.toLocaleString('id-ID')}</span></div>
          </h3>
          <button onClick={handlePrint} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
          <i className="fa-solid fa-print"></i>
          </button>
          <LaporanTransaksi transactions={transactions} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default LaporanTransaksiPage;
