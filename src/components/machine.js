import React, { useEffect, useState, useReducer, useRef } from 'react';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
const Vending = () => {
  const API_URL = 'https://vending-machine-test.vercel.app/api/products';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [numberSelected, setNumberSelected] = useState([]);
  const selectionRef = useRef();
  const defaultState = {
    products: [],
    isLoading: true,
    totalProducts: 0,
    numberSelected: [],

    optionClass: 'btn-number',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        const $numberElement = action.payload.target;
        const current_class = $numberElement.classList.value;

        if (!current_class.includes('selected-item')) {
          $numberElement.classList.add('selected-item');
        }
        if (!state.numberSelected.includes(action.payload.target.innerHTML)) {
          let new_numbers = [
            ...state.numberSelected,
            action.payload.target.innerHTML,
          ];
          console.log(new_numbers);
          return { ...state, numberSelected: new_numbers };
        }
        return state;

      case 'GET_PRODUCTS_LOADING':
        return { ...state, isLoading: true };
      case 'GET_PRODUCTS_SUCCESS':
        return { ...state, products: action.payload, isLoading: false };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS_LOADING' });

    fetch(API_URL)
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log(info.data);
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: info.data });
      });
  }, []);
  return (
    <React.Fragment>
      <div id="main-container" className="container">
        <h2 className="text-center">BIENVENIDO HAZ TU COMPRA</h2>
        <div className="row">
          <div id="col-container" className=" col-md-8 border ">
            <div className="text-center d-flex justify-content-center flex-wrap ">
              {state.isLoading ? (
                <LoadingComponent></LoadingComponent>
              ) : (
                state.products.map((product) => {
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
                {state.products.map((product, index) => {
                  return (
                    <li key={product.id} className="col-md-4">
                      <div className="foor-number"></div>
                      <p
                        className={state.optionClass}
                        onClick={(e) => {
                          console.log(e.target);
                          dispatch({
                            type: 'ADD_ITEM',
                            payload: e,
                          });
                        }}
                      >
                        {index + 1}
                      </p>
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
