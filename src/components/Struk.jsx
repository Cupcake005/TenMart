import React from 'react';

const Struk = ({ cartItems, totalPrice, transactionTime, noStruk }) => {
    return (
        <div className="keranjang struk" id="receipt">
            <div className="struk-header">
                <div style={{ justifyContent: 'left' }}>
                    <img className="logo" src="/img/Logo Ten Mart.jpg" alt="Logo Ten Mart" />
                </div>
                <div>
                    <h1 style={{ justifyContent: 'center' }}>Tenmart</h1>
                    <p style={{ textAlign: 'right', margin: 0, width:'100%', justifyContent:'end' }}>No. {noStruk}</p> 
                </div>
                <hr />
                <p>{transactionTime}</p>
                <hr />
            </div>
            <ul>
                <li>
                    <table>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="text">{item.name}</td>
                                    <td className="text">{item.quantity}</td>
                                    <td className="text">Rp.{item.price}</td>
                                    <td className="text">Rp.{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </li>
            </ul>
            <div className="total-container">
                <p>Total: Rp.{totalPrice}</p>
                <hr />
            </div>
            <p className="text">
                Terima kasih sudah berbelanja di Tenmart!
                <br />
                Happy shopping!
            </p>
        </div>
    );
};

export default Struk;
