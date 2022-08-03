import logo from './logo.svg';
import './App.css';
import UserComponent from './component/UserComponent';
import Register from './Register';
import HomeComponent from './component/HomeComponent';
import { useState } from 'react';
import Login from './component/Login';

function App() {

  return (
    <div className="App">

      <div className="register">

      <HomeComponent/>

      </div>
        <p>
          End User Component
        </p>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


    </div>

  );
}

export default App;
