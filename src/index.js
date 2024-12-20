// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App'; // Mengimpor komponen utama aplikasi

const root = ReactDOM.createRoot(document.getElementById('root')); // Temukan elemen root di DOM
root.render(
  <React.StrictMode> {/* Mode ketat untuk pengembangan */}
    <App /> {/* Komponen utama aplikasi */}
  </React.StrictMode>
);


