import React, { useState, useEffect } from 'react';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [countByCategory, setCountByCategory] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3030/api/products');
        const data = await response.json();

        const countByCategory = {};
        data.products.forEach(product => {
          const categoryId = product.category_id;
          if (!countByCategory[categoryId]) {
            countByCategory[categoryId] = 0;
          }
          countByCategory[categoryId]++;
        });

        setCategories(Object.keys(countByCategory));
        setCountByCategory(countByCategory);
      } catch (error) {
        console.error('Error al obtener las categorías y el conteo:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="totalContainer">
      <h2>Panel de categorías</h2>
      <ul>
        {categories.map(category => (
          <li key={category}>
            {category} - {countByCategory[category]} productos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
