import supabase from "../supabaseClient";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../components/popup/popupRegis";
import { storage, ref, uploadBytes, getDownloadURL } from "../firebaseConfig"; 
import '../Styles/LoginRegis.css';

const RegisterPage = () => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [noHP, setNoHP] = useState('');
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null); 
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); 
    const navigate = useNavigate();


   


    const generateCustomerId = (nama) => {
        const date = new Date();
        const tanggal = String(date.getDate()).padStart(2, '0');
        const bulan = String(date.getMonth() + 1).padStart(2, '0');
        const tahun = date.getFullYear();
        const jam = String(date.getHours()).padStart(2, '0');
        const menit = String(date.getMinutes()).padStart(2, '0');
        const detik = String(date.getSeconds()).padStart(2, '0');
        

        return `${tanggal}${bulan}${tahun}${jam}${menit}${detik}`;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setProfilePhoto(previewURL); 
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
    
                   
                    canvas.width = img.width;
                    canvas.height = img.height;
    
                   
                    ctx.drawImage(img, 0, 0);
    
                    
                    canvas.toBlob(
                        (blob) => {
                            setProfilePhoto(blob); 
                        },
                        "image/jpeg", 
                        0.9
                    );
                };
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
    
        const customerId = generateCustomerId(nama); 
        const defaultPhoto = "/img/userDefault.jpg"; // Path ke gambar default
    
        // Kirim data pengguna baru ke Supabase
        const { data, error } = await supabase
            .from('tbl_users')
            .insert([{ 
                ID_user: customerId, 
                nama_pelanggan: nama, 
                email: email, 
                NoHP: noHP, 
                password: password 
            }])
            .select();
    
        if (error) {
            setMessage(`Pendaftaran gagal: ${error.message}`);
        } else if (data.length > 0) {
            try {
                // Tentukan file yang akan diunggah
                const fileToUpload =
                    profilePhoto ||
                    (await fetch(defaultPhoto).then((res) => res.blob()));
    
                // Upload foto profil ke Firebase Storage
                const photoRef = ref(storage, `profile/${customerId}.jpg`);
                const metadata = {
                    contentType: "image/jpeg", 
                };
    
                await uploadBytes(photoRef, fileToUpload, metadata);
                const photoURL = await getDownloadURL(photoRef);
    
                
                await supabase
                    .from("tbl_users")
                    .update({ Profile: photoURL })
                    .eq("ID_user", customerId);
    
                setMessage(
                    "Pendaftaran berhasil! \nKlik OK untuk login."
                );
                console.log('pendaftaran berhasil');
                setShowPopup(true);
            } catch (uploadError) {
                setMessage(
                    `Pendaftaran berhasil, tetapi gagal mengunggah foto: ${uploadError.message}`
                );
                setShowPopup(true);
            }
    
    
            setNama("");
            setEmail("");
            setNoHP("");
            setPassword("");
            setProfilePhoto(null);
        }
    };
    
    

    const handleClosePopup = () => {
        setShowPopup(false); 
        navigate("/login"); 
    };

    return (
        <div className="container" style={{height:'100vh',backgroundColor:'red'}}>
            <div className="containerRegisLogin bg-white">
                <h2 className="title-form" style={{justifyContent:'center'}}>Pendaftaran Pengguna Baru</h2>
                {message && <p>{message}</p>}
                <form className="container" onSubmit={handleRegister}>
                    {/* <input
                    style={{padding:'20px'}}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                        required
                    /> */}
                    <div className="container bg-white">
                        <p>Upload Foto Profil</p>
                        <div
                            style={{
                                width: "150px",
                                height: "150px",
                                border: "2px solid #ccc",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                backgroundImage: `url(${profilePhoto || "img/user Default.jpg"})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            {!profilePhoto && <i className="fa-regular fa-user fa-xl"></i>}
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <input
                        className="txtInput"
                        type="text"
                        placeholder="Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                    <input
                        className="txtInput"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="txtInput"
                        type="text"
                        placeholder="No HP"
                        value={noHP}
                        onChange={(e) => setNoHP(e.target.value)}
                        required
                    />
                    <input
                        className="txtInput"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button className="btnBlue" type="submit">Daftar</button>
                </form>

                
                {showPopup && (
                    <Popup 
                        message={message} 
                        onClose={handleClosePopup} 
                    />
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
