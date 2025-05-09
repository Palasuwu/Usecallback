// Importamos los hooks que vamos a usar de React
const { useState, useCallback, useRef, memo } = React;

// Componente ButtonOptimizado: usa React.memo para evitar renders innecesarios
const ButtonOptimizado = memo(({ onClick }) => {
  // Contador de renders usando useRef (no causa renderizado al cambiar)
  const renderCount = useRef(0);
  renderCount.current += 1;

  console.log("Render: ButtonOptimizado");

  return (
    <div>
      <button onClick={onClick}>Generate Random Number</button>
      {/* Mostramos cuántas veces se ha renderizado este componente */}
      <p style={{ fontSize: '0.8rem', color: '#888' }}>
        Renders: {renderCount.current}
      </p>
    </div>
  );
});

// Componente ButtonNormal: se vuelve a renderizar cada vez que cambia el padre
const ButtonNormal = ({ onClick }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  console.log("Render: ButtonNormal");

  return (
    <div>
      <button onClick={onClick}>Increment Counter</button>
      <p style={{ fontSize: '0.8rem', color: '#888' }}>
        Renders: {renderCount.current}
      </p>
    </div>
  );
};

// Componente principal que contiene los estados y las funciones
function CartaDeElementos() {
  // Estado para el número aleatorio
  const [randomNumber, setRandomNumber] = useState(0);

  // Estado para el contador
  const [counter, setCounter] = useState(0);

  // Función que genera un número aleatorio (está memorizada con useCallback)
  const createRandom = useCallback(() => {
    setRandomNumber(Math.floor(Math.random() * 100));
  }, []);

  // Función que incrementa el contador (NO está memorizada, se crea nueva cada vez)
  const addCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>
        useCallback con Botones{" "}
        {/* Enlace que abre un repositorio o recurso externo */}
        <a href="https://github.com/Palasuwu/Usecallback" target="_blank" rel="noopener noreferrer">
          repo
        </a>
      </h1>

      <div className="card">
        <h2>Element Card</h2>
        {/* Mostramos el número aleatorio y el contador */}
        <p><strong>Random Number:</strong> {randomNumber}</p>
        <p><strong>Counter:</strong> {counter}</p>

        {/* Botones que ejecutan las funciones directamente */}
        <button onClick={createRandom}>Generate Random Number</button>
        <button onClick={addCounter}>Increment Counter</button>
      </div>

      <div className="child">
        <h2>ButtonOptimizado</h2>
        {/* Le pasamos la función memorizada al botón */}
        <ButtonOptimizado onClick={createRandom} />
      </div>

      <div className="child">
        <h2>ButtonNormal</h2>
        {/* Le pasamos la función sin memo, que se vuelve a crear cada vez */}
        <ButtonNormal onClick={addCounter} />
      </div>
    </div>
  );
}

// Montamos el componente principal en el div con id "root"
ReactDOM.createRoot(document.getElementById("root")).render(<CartaDeElementos />);
