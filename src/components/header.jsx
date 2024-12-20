import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "./userController";
import SearchBar from "../components/searchButton";
import '../Styles/headerStyle.css';
import '../fontawesome/css/all.css';

const Header = () => {
    const [userData, setUserData] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const ID_pelanggan = localStorage.getItem("ID_user");

        if (ID_pelanggan) {
            const getUserData = async () => {
                const user = await fetchUserData(ID_pelanggan);
                setUserData(user);
            };
            getUserData();
        }
    }, []);

    const openLogoutModal = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
    };

    const confirmLogout = () => {
        localStorage.removeItem("ID_user");
        setUserData(null);
        setShowLogoutModal(false);
        navigate("/");
    };

    return (
        <header className="header">
            <div className="container-icon">
                <img src="/img/Logo Ten Mart.jpg" alt="Logo" className="logo" />
            </div>

            <div className="headKanan">
                <div className="headerAtas">
                    <ul className="user">
                        {userData ? (
                            <>
                                
                                <li>
                                    <img src={userData.Profile} alt="Profile" className="profile-pic" />
                                </li>
                                <li className="userI">{userData.nama_pelanggan}</li>
                                <li className="userI" onClick={openLogoutModal}><i className="fa-solid fa-arrow-right-from-bracket"></i></li>
                            </>
                        ) : (
                            <>
                                <li className="userI" onClick={() => navigate('/register')}>Daftar</li>
                                <li className="userI" onClick={() => navigate('/login')}>Login</li>
                            </>
                        )}
                    </ul>
                </div>

                <nav className="headerNav">
                    <SearchBar />
                    <button className="fa-sharp fa-solid fa-cart-shopping fa-xl btnRed btnCart" onClick={() => navigate('/cart')}></button>
                    
                </nav>
            </div>

            {/* Modal Logout Popup */}
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="p1">Konfirmasi Logout</h3>
                        <p className="p1">Apakah Anda yakin ingin logout?</p>
                        <button style={{backgroundColor:'blue', color:'white'}} onClick={confirmLogout}>Ya, Logout</button>
                        <button style={{backgroundColor:'red', color:'white'}} onClick={closeLogoutModal}>Batal</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;