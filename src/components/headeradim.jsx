import React from "react";
import '../Styles/Headeradmin.css';
import '../fontawesome/css/all.css';
import { useNavigate } from "react-router-dom";

const Headeradmin = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem("user");
        window.location.reload();
    };

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="header-adm">
            {/* Tombol Back */}
            <button className="back-button" onClick={handleBack}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="ad-font">Admin Page</h1>
            <div className="icon-wrapper">
                <i className="fas fa-user-circle"></i>
                <div className="burger-menu">
                    <ul>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
};

export default Headeradmin;
