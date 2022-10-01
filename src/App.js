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
//import { useUser } from './component/user/UserContext';
import Content from './component/Content';
import UserLeftSideNav from './component/user/UserLeftSideNav';
import UserDetails from './component/user/UserDetails';



function App() {
  const [app_url, setApiUrl] = useState("");
  const [user, setUser] = useState({});
  const [signInuserName, setUserName] = useState("");
 //const user = useUser();


  
  
//console.log("The user .. is ..",user);
 
  //const updateUser = useUserUpdate();

  console.log(window.location);
  const ref = useRef(null);




  return (

    
    <UserProvider>
      
        
    <div className="App">

          <div className="navDiv">
            <div className='navDivIner'>
            <Navbar/>
            <Clock/>
            

        

            <div className='content'>

            

                <div className="container1">
                <Routes>
               
                <Route path="/" element={<HomeComponent user={user}/>} />
                  <Route path="/api/login" element={<Login/>} />
                  <Route path="/talodu/api/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/user/details/:id" element={<Content target="user-images"/>}  />
                  <Route path="/users/list" element={<UserComponent/>}/>
                  <Route path="/user/add" element={<AddUser/>} />
                  <Route path="/api/logout" element={<Logout/>} />
                  <Route path="/talodu/api/logout" element={<Logout/>} />
                  <Route path="/talodu/api/profile" element={<UserProfile/>} />
                  <Route path="/api/profile" element={<Content target="user-profile"/>} />
                  <Route path="/user/roles" element={<Content target="user-roles"/>} />
                  
                 
                </Routes>
                </div>
            </div>

              
            </div>
                   
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
