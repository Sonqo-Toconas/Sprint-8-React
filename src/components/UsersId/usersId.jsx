import React, { useState, useEffect } from 'react';

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
            <p>Último usuario registrado: {lastUser.name}</p>
            <p>Último producto registrado: {lastProduct.name}</p>
        </div >
    )
}

export default ListClient;