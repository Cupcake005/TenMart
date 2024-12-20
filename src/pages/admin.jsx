import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Haederadmin from "../components/headeradim";
import '../Styles/admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Haederadmin />
            <div className="container">
            <div className="container-admin">
                    <ul className="card-list">
                        <li className="card-item" onClick={() => navigate('/admin/addproduct')}>
                            <i className="fas fa-plus-circle iconsize"></i>
                            <p>Tambah Data Barang</p>
                        </li>
                        <li className="card-item" onClick={() => navigate('/admin/products')}>
                            <i className="fas fa-list iconsize"></i>
                            <p>Daftar Barang</p>
                        </li>
                        <li className="card-item" onClick={() => navigate('/admin/users')}>
                            <i className="fas fa-users iconsize"></i>
                            <p>Data Pelanggan</p>
                        </li>
                        <li className="card-item" onClick={() => navigate('/admin/laporan')}>
                            <i className="fas fa-chart-bar iconsize"></i>
                            <p>Laporan Transaksi</p>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
