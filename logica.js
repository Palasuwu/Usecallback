const { useState, useCallback, memo } = React;

const ButtonOptimizado = memo(({ onClick }) => {
  console.log("Render: ButtonOptimizado");
  return <button onClick={onClick}>Click (useCallback)</button>;
});

const ButtonNormal = ({ onClick }) => {
  console.log("Render: ButtonNormal");
  return <button onClick={onClick}>Click (función nueva)</button>;
};

function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [counter, setCounter] = useState(0);

  const createRandom = useCallback(() => {
    setRandomNumber(Math.floor(Math.random() * 100));
  }, []);

  const addCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>🔁 Simulación useCallback</h1>

      <div className="card">
        <h2>Carta de elementos</h2>
        <p><strong>Número aleatorio:</strong> {randomNumber}</p>
        <p><strong>Contador:</strong> {counter}</p>

        <button onClick={createRandom}>Generar Aleatorio (useCallback)</button>
        <button onClick={addCounter}>Sumar Contador (función nueva)</button>
      </div>

      <div className="child">
        <h2>ButtonOptimizado</h2>
        <ButtonOptimizado onClick={createRandom} />
      </div>

      <div className="child">
        <h2>ButtonNormal</h2>
        <ButtonNormal onClick={() => setCounter((c) => c + 1)} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
