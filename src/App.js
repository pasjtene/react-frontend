import logo from './logo.svg';
import './App.css';
import UserComponent from './component/UserComponent';
import Register from './Register';
import HomeComponent from './component/HomeComponent';
import { useState } from 'react';
import Login from './component/Login';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AddUser from './component/AddUserComponent';
import Logout from './component/Logout';

const mylocation = window.location.origin;

function App() {

  console.log(window.location);

  return (
    <div className="App">


        

      <div className="register1">

      

      <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/api/login" element={<Login/>} />
        <Route path="/talodu/api/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/users/list" element={<UserComponent/>} />
        <Route path="/user/add" element={<AddUser/>} />
        <Route path="/api/logout" element={<Logout/>} />
        <Route path="/talodu/api/logout" element={<Logout/>} />
        
      </Routes>

    
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
