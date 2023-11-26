import React, { useState, useEffect } from 'react';
import './TotalPanel.css'

function TotalPanel() {
    const [totalProducts, setTotalProducts] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [totalCategories, setTotalCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/products')
            .then(response => response.json())
            .then(data => {
                setTotalProducts(data.count)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3030/api/users')
            .then(response => response.json())
            .then(data => {
                setTotalUsers(data.count)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3030/api/categories')
            .then(response => response.json())
            .then(data => {
                setTotalCategories(data.count)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="totalContainer">
            <p>Total de productos {totalProducts}</p>
            <p>Total de usuarios {totalUsers}</p>
            <p>Total de categorías {totalCategories}</p>
        </div >
    )
}

export default TotalPanel