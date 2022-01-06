import React, { useEffect, useState, useReducer, useRef } from 'react';
const Vending = () => {
  const API_URL = 'https://vending-machine-test.vercel.app/api/products';
  const [products, setProducts] = useState([]);
  const getProdducts = async () => {
    try {
      const res = await fetch(API_URL);
      const obj = await res.json();
      console.log(obj);
      console.log(obj.data);
      setProducts(obj.data);
    } catch (error) {
      throw Error(error);
    }
  };
  useEffect(() => {
    getProdducts();
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <h2 className="text-center">BIENVENIDO HAZ TU COMPRA</h2>
        <div className=" col-md-8 ">
          <div className="text-center d-flex justify-content-center flex-wrap ">
            {products.map((products) => {
              const { id, thumbnail, preparation_time } = products;
              return (
                <ul
                  key={id}
                  className="col-md-4 list-unstyled  card-header text-center"
                >
                  <li className="card-header">
                    <strong>ID: </strong> {id}
                  </li>
                  <li className="card card-body">
                    <img src={thumbnail} alt={thumbnail} />
                  </li>
                  <li className="card card-body">
                    <strong>TIEMPO: </strong>
                    {preparation_time}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Vending;
