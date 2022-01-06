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
      <div id="main-container" className="container">
        <h2 className="text-center">BIENVENIDO HAZ TU COMPRA</h2>
        <div className="row">
          <div id="col-container" className=" col-md-8 border ">
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
                      <img
                        src={thumbnail}
                        alt={thumbnail}
                        className="img-fluid"
                      />
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
          <div className="border col-md-4">
            <h2 className="  text-center mt-5 ">Selecciona</h2>
            <div id="wrapper-menu">
              <ul className="panels-menu d-flex justify-content-center flex-wrap">
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary"> 1</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">2</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">3</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">4</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">5</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">6</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">7</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">8</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">9</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">10</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">11</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">12</p>
                </li>
                <li className="col-md-4">
                  <div className="foor-number"></div>
                  <p className="btn btn-secondary">13</p>
                </li>
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
export default Vending;
