import React, { useState, useEffect } from 'react';
function customStateHook(initValue, increaseBy) {
  const [state, stateSet] = useState(initValue);
  const handleChange = (event) => {
    event.preventDefault();
    stateSet((oldState) => oldState + increaseBy);
  };
  return { state, handleChange, increaseBy };
}

function ComponentApp3(props) {
  return (
    <div>
      <form>
        <button onClick={props.handleChange}>+{props.increaseBy}</button>
        <h2>{props.state}</h2>
      </form>
    </div>
  );
}

function App3() {
  const { state, handleChange, increaseBy } = customStateHook(10, 10);
  const propsComponent3 = customStateHook(10, 100);

  return (
    <div>
      <h1>App 3 - Use State (Custom hook)</h1>
      <form>
        <button onClick={handleChange}>+ {increaseBy}</button>
        <h2>{state}</h2>
      </form>

      {/* 
     <ComponentApp3
        state={propsComponent3.state}
        handleChange={propsComponent3.handleChange}
        increaseBy={propsComponent3.increaseBy}
      />
     // Lets reuse the custom hook
     <ComponentApp3 {...customStateHook(0, 100)} />
     <ComponentApp3 {...customStateHook(900, 1)} />
     <ComponentApp3 {...customStateHook(13, 13)} /> 
     
     */}
    </div>
  );
}
export default App3;
