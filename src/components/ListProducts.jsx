import React, { useState, useEffect } from 'react';

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
        <div>
            {console.log(products[1])}
            <ul>
            {products.map((producto, i) => {
    return (
        <li key={i}>
            <a href={`/products/${producto.id}`}>{producto.name}</a>
        </li>
    );
})}

            </ul>

        </div >

    )
}

export default ListProducts;