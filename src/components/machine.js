import React, { useEffect, useState, useReducer, useRef } from 'react';

function playCountDown(counterValue) {}

function timeout(ms) {
  //  $resultadosContainer.classList.remove("set-opacity")

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
}
const mostrarResultados = async (name) => {
  const $resultadosContainer = document.getElementById('resultados-container');
  const $div = document.createElement('div');
  $div.classList.add('contenedor-imagenes');
  $div.innerHTML = `<img class="img-resultado"  src="${name}" alt="${name}" /> `;
  $resultadosContainer.appendChild($div);
};

const Vending = () => {
  const API_URL = 'https://vending-machine-test.vercel.app/api/products';
  /*const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [numberSelected, setNumberSelected] = useState([]);
  */

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
          return { ...state, numberSelected: new_numbers };
        }
        return state;

      case 'GET_PRODUCTS_LOADING':
        return { ...state, isLoading: true };
      case 'GET_PRODUCTS_SUCCESS':
        return { ...state, products: action.payload, isLoading: false };
      case 'SHOW_ITEMS':
        (async () => {
          let arr_differences = [];
          for (let index = 0; index < state.products.length; index++) {
            state.numberSelected.sort();
            //console.log('retornando ' + index);
            for (
              let numbers_index = 0;
              numbers_index < state.numberSelected.length;
              numbers_index++
            ) {
              if (index == state.numberSelected[numbers_index]) {
                //siguiente numero
                let next_number_selected = '';
                //let res = state.numberSelected.(numbers_index + 1);

                if (!numbers_index + 1 === state.numberSelected.length) {
                  next_number_selected =
                    state.numberSelected[numbers_index + 1];
                }

                const current_number_selected =
                  state.numberSelected[numbers_index];
                let time_difference = 0;

                if (!!next_number_selected) {
                  time_difference =
                    next_number_selected - current_number_selected;
                  arr_differences.push(time_difference);
                }
                console.error(time_difference);

                index += 1;

                console.log(
                  'EQUAL NUMBERS' + state.numberSelected[numbers_index]
                );
                let delay = index * 1000;

                if (numbers_index !== 0) {
                  //debo de usar la resta que queda en la iteracion anterior no en esta , por es falla
                  const current_difference = arr_differences.at(-1);
                  delay = current_difference * 1000;
                  delay += 1000;
                }
                console.error(delay);
                let counterValue = delay / 1000;

                /*alert(
                  'DIFFERENCE ' +
                    next_number_selected +
                    '' +
                    current_number_selected
                );
                alert('DELAY ' + delay);
                alert('counter ' + counterValue);*/

                const countDown = setInterval(() => {
                  console.log(counterValue);
                  counterValue--;

                  const $counter = document.getElementById('counter');
                  $counter.textContent = `${counterValue}`;
                }, 1000);
                await timeout(delay);
                mostrarResultados(state.products[numbers_index]['thumbnail']);

                clearInterval(countDown);
              }
            }
          }
        })();
        return state;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS_LOADING' });
    setTimeout(() => {
      fetch(API_URL)
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: info.data });
        });
    }, 2500);
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
                <button
                  id="comprar"
                  className="btn btn-success"
                  onClick={() => {
                    dispatch({ type: 'SHOW_ITEMS' });
                  }}
                >
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
              <p id="counter" align="center">
                0
              </p>
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
