// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import '../fontawesome/css/all.css';
import '../Styles/UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, error } = await supabase
                    .from('tbl_users')
                    .select('*'); 

                if (error) throw error;
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const handleDelete = async (ID_user) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) return; // Exit if the user cancels the deletion

        try {
            const { error } = await supabase
                .from('tbl_users')
                .delete()
                .eq('ID_user', ID_user); 

            if (error) throw error;

            
            setUsers(users.filter((user) => user.ID_user !== ID_user));
            alert('User deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Hapus data pelanggan gagal.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className='container'>
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table className='tb-usr'>
                        <thead>
                            <tr>
                                <th className='th-usr'>Profile</th>
                                <th className='th-usr'>ID</th>
                                <th className='th-usr'>Name</th>
                                <th className='th-usr'>Email</th>
                                <th className='th-usr'>No HP</th>
                                <th className='th-usr'>Password</th>
                                <th className='th-usr'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.ID_user}>
                                    <td className='td-usr'>
                                        <img
                                            className='img-profile'
                                            src={user.Profile || '/img/userDefault.jpg'}
                                            alt="Profile"
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit:'cover' }}
                                        />
                                    </td>
                                    <td className='td-usr'>{user.ID_user}</td>
                                    <td className='td-usr'>{user.nama_pelanggan}</td>
                                    <td className='td-usr'>{user.email}</td>
                                    <td className='td-usr'>{user.NoHP}</td>
                                    <td className='td-usr'>{user.password}</td>
                                    <td className='td-usr'>
                                        <button className='fa-solid fa-trash btn-usr' onClick={() => handleDelete(user.ID_user)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', border:'0'}}></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserList;
