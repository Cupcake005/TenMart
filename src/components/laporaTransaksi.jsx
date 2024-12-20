import React from "react";
import '../Styles/laporanTransaksi.css';

const LaporanTransaksi = ({ transactions, loading }) => {
  // Urutkan data transaksi berdasarkan tanggal transaksi, urutan menurun (terbaru ke terlama)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.tgl_transaksi) - new Date(a.tgl_transaksi);
  });

  return (
    <div style={{ width: '100%' , overflowX:'scroll'}}>
      {loading ? (
        <p>Sedang memuat data...</p>
      ) : (
        <div className="container-laporan" style={{backgroundColor:'white'}}>
          <table className="tbl-laporan" border="1" style={{ width: "100%"}}>
            <thead style={{ backgroundColor: '#ddd' }}>
              <tr style={{border:'1px black solid'}}>
                <th>ID</th>
                <th>User ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Tanggal Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} style={{border:'1px black solid'}}>
                    <td className="td-laporan">{transaction.id}</td>
                    <td className="td-laporan">{transaction.ID_user}</td>
                    <td className="td-laporan" style={{ maxWidth: '400px' }}>
                      <div>
                        {transaction.items.map((item, index) => (
                          <div key={index} style={{ borderBottom: 'solid #ddd 1px', width:'max-content', paddingBottom:'5px', paddingTop:'5px'}}>
                            {item.name} ({item.quantity})
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="td-laporan" style={{textAlign:'left'}}>Rp {transaction.total.toLocaleString("id-ID")},00</td>
                    <td className="td-laporan" style={{textAlign:'center'}}>
                      {new Date(transaction.tgl_transaksi).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Tidak ada data transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LaporanTransaksi;
