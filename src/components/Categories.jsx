import React, { useState, useEffect } from 'react';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3030/api/products');
        const data = await response.json();
        
        setCategories(data.countByCategory);
      } catch (error) {
        console.error('Error al obtener las categorías y el conteo:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="totalContainer">
      <h2>Panel de categorías</h2>
        {Object.entries(categories).map(([category, count], i) => {
          return (
            <div key={i} style={{ cursor: 'default' }}>
              {category}: <strong>{count}</strong>
            </div>
            )
        })}
    </div>
  );
}

export default Categories;
