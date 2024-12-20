import React from "react";
import UserList from "../components/userList";
import Headeradmin from "../components/headeradim";


const UsersPage = () => {
    return (
        <div>
            <Headeradmin/>
            <h2 style={{padding:'20px'}}>Daftar Pelanggan</h2>
            <div style={{padding:'20px',overflow:'scroll'}}>
                <UserList />
            </div>
        </div>
    );

};

export default UsersPage;