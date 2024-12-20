import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Styles/BtnSearchStyle.css";
import '../fontawesome/css/all.css';
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); 

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        navigate('/search', { state: { query: searchQuery } }); 
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Cari barang..."
                className="search-input"
            />
            <button onClick={handleSearchClick} className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    );
};

export default SearchBar;
