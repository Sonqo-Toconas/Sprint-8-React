import React, { useState, useEffect } from 'react';
import Style from "./Product.module.css";
function ListProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className={Style.conteinerCard}>
            <h2>Lista de productos</h2>
            
            {products.map((producto, i) => {
                return (
                    <div className={Style.cardProduct} key={i} >
                        <a href={`/admin/${producto.id}`}>{producto.name}</a>
                    </div>
                );
})}


        </div >

    )
}

export default ListProducts;