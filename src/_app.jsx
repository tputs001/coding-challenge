/*
Requirements

1. Fix runtime errors that is causing rendering issue
2. Make / Suggest any optimziations to the component
3. Add a feature that will add items to a list and display the name in the view
4. Add a feature that will also let you delete the item from the list 

*/

import  { useEffect, useState } from "react";

export function App() {
  const [productsData, setProductsData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadProducts =  () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/tputs001/mock-api/products"
      );
      setProductsData(response);
    };

    loadProducts();
  });

  if (!productsData.length) {
    return <div>Loading</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProductList = productsData.filter(
    (product) => product.quantity
  );

  const productList = filteredProductList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pages = getPageNumbers(filteredProductList.length, productsPerPage);

  return (
    <div className="container">
      <h1>iHerb</h1>
      <div className="products-container">
        {productList.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.imageUrl}></img>
            <div className="product-name">{product.name}</div>
            <div>{product.listPrice}</div>
            <div>Quantiy: {product.quantity}</div>
            <div
              className="add-to-cart"
              onClick={() => setCart([...cart, product])}
            >
              Add to cart
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {pages.map((page) => (
          <span onClick={() => setCurrentPage(page)}>{page}</span>
        ))}
      </div>
    </div>
  );
}

const getPageNumbers = (totalProducts, productsPerPage) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
