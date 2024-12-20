import React, { useState } from "react";
import { loginUser } from "../components/loginController";
import { useNavigate } from 'react-router-dom';
import "../Styles/LoginRegis.css"


function LoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(identifier === '001' && password === 'admin'){
            alert('Login Sebagai Admin Berhasil');
            navigate('/admin');
            return;
        }
        
        const response = await loginUser(identifier, password);

        if (response.success) {
            alert('Login Berhasil');
            localStorage.setItem("ID_user", response.user.ID_user); 
            navigate('/');
        } else {
            setMessage(response.error);
            alert('Login error');
        }
    };

    return (
        <div className="container" style={{backgroundColor:'red', height:'100vh'}}>
            <div className="containerRegisLogin bg-white">
                <h2 className="title-form">Login Page</h2>
                <form className="container" style={{backgroundColor:'transparent'}} onSubmit={handleLogin}>
                    <input
                        className="txtInput" 
                        type="text" 
                        placeholder="Email atau No HP"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <input 
                        className="txtInput"
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btnBlue" type="submit">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default LoginPage;
