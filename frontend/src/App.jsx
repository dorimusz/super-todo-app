import './App.css';
import React from 'react';
// import NumberPresenter from './NumberPresenter';
// import NumberModifier from './NumberModifier';
// import { useCounter } from './CounterProvider';
import { Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Callback from './pages/Callback'
import Protected from './components/Protected';
import Register from './pages/Register';

function App() {
  // const [value, setValue] = useState(0); //no need 
  // const { value, decrement, increment } = useCounter(); //ez nem a valuet adja vissza listaként két elemmel, hanem a useContext object értékét/valueját adja vissza, amin rajta van a value, decrement és increment

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={(
          <Protected key={"1"}>
            <Profile />
          </Protected>
        )} />
        <Route path="/callback/:provider" element={<Callback />} />
        <Route path="/register" element={(
          // azért adtunk keyt, mert azt hiszi, hogy ugyan az a komponens és nem hozza teljesen az elvárt működést
          <Protected key={"2"}>
            <Register />
          </Protected>)} />
      </Routes>

      {/* <section>
          <h1>Change the value by clicking the buttons</h1>
          <p>{value}</p>
          <button onClick={decrement}>+</button>
          <button onClick={increment}>-</button>

          <NumberPresenter />
          <NumberModifier />
        </section> */}

    </div >
  );
}

export default App;
