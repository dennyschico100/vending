function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state, key]); // Adding the state and the key as dependencies

  return [state, setState];
}

function App3({ initialName = '' }) {
  // Moving all the logic to another function to reuse it
  const [name, setName] = useLocalStorageState('name3', initialName);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <h1>App 3 - Create Reusable Hook</h1>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}
export default App3;
