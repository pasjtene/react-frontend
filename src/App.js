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
import Clock from './component/Clock';
import React from 'react';
import Cookies from 'js-cookie';
import { UserProvider } from './component/user/UserContext';
import { useUser } from './component/user/UserContext';
import Content from './component/Content';
//import User from './component/user/User';
//import { logedInuser } from './component/user/User';


//const mylocation = window.location.origin;
// Theme context, default to light theme
//export const ThemeContext = React.createContext('light');

// Signed-in user context
//export const UserContext = React.createContext({
  //user:{}
//});


function App() {
  const [app_url, setApiUrl] = useState("");
  const [signInuser, setUser] = useState({});
  const [signInuser2, setUser2] = useState({});
 const user = useUser();

  
  

 
  //const updateUser = useUserUpdate();

  console.log(window.location);
  const ref = useRef(null);

  useEffect(() => {

    //console.log("The user f..", <User/>)
    //const user = useUser();
    setUser2(user);
    console.log("The user f5 is..", user.firstName);
    

    const el = document.getElementById('loginout');
    console.log("The ellement...", el);

    // 👇️ (better) use a ref
    const el2 = ref.current;
    console.log(el2);

    if(Cookies.get("user")) {
      const authUser = JSON.parse(Cookies.get("user"));
      //console.log("The number of users to delete: ", userFN);
      setUser(authUser);
  //setLN(authUser.lastName);

  console.log("The user from FN2 home component...", authUser.firstName);

  }

  },[]




  );

  return (

    
      <UserProvider>

      

    <div className="App">

          <div className="navDiv">
            <div className='navDivIner'>
            <Navbar/>
            <Clock/>
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
                  <Route path="/api/profile" element={<Content target="user-profile"/>} />
                  
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
    </UserProvider>
    
    
  );
}

export default App;
