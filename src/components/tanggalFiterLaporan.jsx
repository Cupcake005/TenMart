import React, { useState, useEffect } from "react";

const TanggalFilter = ({ onStartDateChange, onEndDateChange }) => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = "01";  // Mengatur tanggal menjadi 1
    return `${yyyy}-${mm}-${dd}`;  // Format: YYYY-MM-01
  });

  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;  // Format: YYYY-MM-DD (hari ini)
  });

  useEffect(() => {
    // Setelah component pertama kali dimuat, load data transaksi
    onStartDateChange(startDate);
    onEndDateChange(endDate);
  }, []);  // Hanya dijalankan sekali saat component pertama kali dimuat

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    onStartDateChange(newStartDate); 
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    onEndDateChange(newEndDate);
  };

  return (
    <div className="tanggal-filter" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <div style={{ marginRight: '10px' }}>
        <label htmlFor="startDate">Tanggal Mulai:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div style={{ marginRight: '10px' }}>
        <label htmlFor="endDate">Tanggal Akhir:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default TanggalFilter;
