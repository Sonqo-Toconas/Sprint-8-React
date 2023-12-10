import React, { useState, useEffect } from 'react';
import { FaUserClock } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";


function ListClient() {
    const [lastUser, setLastUser] = useState([]);
    const [lastProduct, setLastProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/users')
            .then(response => response.json())
            .then(data => {
                setLastUser(data.users[data.users.length -1]);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/api/products')
            .then(response => response.json())
            .then(data => {
                setLastProduct (data.products[data.products.length -1])
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Ultimos Registros</h1>
            <p>Último usuario registrado: <strong>{lastUser.name} <FaUserClock style={{ marginBottom: -2 }}/></strong></p>
            <p>Último producto registrado: <strong> {lastProduct.name} <MdOutlinePhoneIphone style={{ marginBottom: -2 }}/> </strong> </p>
        </div>
    )
}

export default ListClient;