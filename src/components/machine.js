import React, { useEffect, useState, useReducer, useRef } from 'react';
const Vending = () => {
  const API_URL = 'https://vending-machine-test.vercel.app/api/products';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const getProdducts = async () => {
    try {
      const res = await fetch(API_URL);
      const obj = await res.json();
      console.log(obj);
      console.log(obj.data);
      setProducts(obj.data);
      setTotalProducts(products.length);
      console.log(totalProducts);
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    } catch (error) {
      throw Error(error);
    }
  };
  useEffect(() => {
    getProdducts();
  }, []);
  return (
    <React.Fragment>
      <div id="main-container" className="container">
        <h2 className="text-center">BIENVENIDO HAZ TU COMPRA</h2>
        <div className="row">
          <div id="col-container" className=" col-md-8 border ">
            <div className="text-center d-flex justify-content-center flex-wrap ">
              {isLoading ? (
                <LoadingComponent></LoadingComponent>
              ) : (
                products.map((product) => {
                  return (
                    <ShowProducts
                      key={product.id}
                      product={product}
                    ></ShowProducts>
                  );
                })
              )}
            </div>
          </div>
          <div className="border col-md-4">
            <h2 id="head-wrapper-menu" className="  text-center mt-5 ">
              Selecciona
            </h2>
            <div id="wrapper-menu">
              <ul className="panels-menu d-flex justify-content-center flex-wrap">
                {products.map((product, index) => {
                  return (
                    <li key={product.id} className="col-md-4">
                      <div className="foor-number"></div>
                      <p className="btn btn-secondary">{index + 1}</p>
                    </li>
                  );
                })}
              </ul>
              <div id="botones-container">
                <button id="comprar" className="btn btn-success">
                  Comprar
                </button>
                <button id="reiniciar" className="btn btn-danger">
                  Reiniciar
                </button>
              </div>
              <h3 className="msg-error-show" id="msg-error">
                Seleccionr una opcion
              </h3>
            </div>
            <div id="resultados-container"></div>
            <div>
              <p id="counter" align="center"></p>
            </div>

            <div id="spinner" className="lds-dual-ring"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const ShowProducts = (props) => {
  const { id, thumbnail, preparation_time } = props.product;
  return (
    <ul className="col-md-4 list-unstyled  card-header text-center">
      <li className="card card-body">
        <strong>ID: </strong> {id}
        <img src={thumbnail} alt={thumbnail} className="img-fluid" />
      </li>
      <li className="card card-body">
        <strong>TIEMPO: </strong>
        {preparation_time}
      </li>
    </ul>
  );
};
const LoadingComponent = () => {
  return (
    <div className="lds-div">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default Vending;
