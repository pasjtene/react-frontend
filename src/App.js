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
import { useRef, useEffect } from 'react';
import UserProfile from './component/UserProfile';


const mylocation = window.location.origin;


function App() {
  const [app_url, setApiUrl] = useState("");

  console.log(window.location);
  const ref = useRef(null);

  useEffect(() => {

    const el = document.getElementById('loginout');
    console.log("The ellement...", el);

    // 👇️ (better) use a ref
    const el2 = ref.current;
    console.log(el2);

  },[]

  );

  return (
    <div className="App">

          <div className="navDiv">
            <div className='navDivIner'>
            <Navbar/>
            </div>
                   
                </div>
        

      <div className="container1">

      

                <Routes>
                  <Route path="/" element={<HomeComponent/>} />
                  <Route path="/api/login" element={<Login/>} />
                  <Route path="/talodu/api/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/users/list" element={<UserComponent/>} />
                  <Route path="/user/add" element={<AddUser/>} />
                  <Route path="/api/logout" element={<Logout/>} />
                  <Route path="/talodu/api/logout" element={<Logout/>} />
                  <Route path="/talodu/api/profile" element={<UserProfile/>} />
                  <Route path="/api/profile" element={<UserProfile/>} />
                  
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
