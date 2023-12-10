import React, { useState, useEffect } from 'react';
import Style from "../TotalPanel/TotalPanel.module.css";
import { FcSalesPerformance } from "react-icons/fc";

function Categories() {
    const [solds, setSolds] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3030/api/solds');
                const data = await response.json();
                console.log(data);

                setSolds(data.data);
            } catch (error) {
                console.error('Error al obtener las categorías y el conteo:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="totalContainer">
            <h2>Panel de Ventas <FcSalesPerformance style={{ marginBottom: -3 }}/></h2>
            
                <h3> Total de ventas: {solds.length} </h3>
            <div className={Style.listSolds}>
                {solds.map((sold, i) => {
                    let totalPrice = sold.product.price * sold.amount
                    return (
                        <>
                            <div key={i}>
                                <h4>Id de la compra: <strong>{sold.id_sold}</strong> </h4>
                                <p>Usuario: <strong> {sold.user.name} </strong> <br /> </p>
                                <p>Producto : <strong>{sold.product.name}</strong> <br /> </p>
                                <p>Precio : <strong> ${sold.product.price}</strong> <br /> </p>
                                <p>Cantidad : <strong>{sold.amount}</strong> <br /> </p>
                                <p>Total : <strong> ${totalPrice}</strong> <br /> </p>
                            </div>
                        </>
                        )
                })
                }
            </div>
        </div>
    );
}

export default Categories;
