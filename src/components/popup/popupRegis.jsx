// src/components/Popup.js
import React from "react";
import "./popupRegis.css"; // Tambahkan CSS untuk popup

const Popup = ({ message, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Popup;


