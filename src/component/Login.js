import React from "react";
import { useState, useContext } from "react";
import Register from "../Register";
import UserComponent from "./UserComponent";
import { useForm } from "react-hook-form";
import axios from "axios";
import UserService from "../services/UserService";
import HomeComponent from "./HomeComponent";

import { ReactDOM } from "react";
import { useEffect } from "react";

import {  AuthContext } from "../Navbar";

import Cookies from 'js-cookie';
import { useUser, useUserUpdate} from "./user/UserContext";
import Content from "./Content";
//import { UserContext } from "../App";





//export function useUser() {
    //return useContext(UserContext);
//}


const AUTH_URL = "http://localhost:8085/api/authenticate";

    
    const Login = (props) => {
        const [homePage, setHomePage] = useState("home");
        const { isUserAuth } = useContext(AuthContext)
       const [isAuth, setAuth ] = useContext(AuthContext);
       const [userFN, setFN] = useState("Guest");
        const [userOut, setLogOut] = useState("");
        const [user, setUser] = useState({});

        const userc = useUser();
        const updateUser = useUserUpdate();
        //useUserUpdate({});

        useEffect(()=>{

                if(userc.id){
                   
                    setLogOut(props.logincontext);
                }
                
            console.log("The target page is ", props.target);
 
        },[userOut])

        const { register, handleSubmit } = useForm({
            defaultValues: {
                username: "",
                password: "",
                email: ""
              }
        });



        if(userOut=="log-out") {
            updateUser({});
            //Cookies.set("user",  {});
            Cookies.remove("user");

        }

        switch (homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            //case "homepage": return (<div> <HomeComponent firstName={userFN} lastName={userLN} user={user} /> </div>);
            //case "homepage": return (<div> <HomeComponent /> </div>);
            case "homepage": return (<div> <Content target="user-profile"/> </div>);


            
        
        }

        



        const onSubmit = async (data,e) => {  
            e.preventDefault();
            console.log("The data: ", data);
            
            
            try {
                const response = await UserService.authenticate(JSON.stringify(data));
                
                console.log("Received auth data", response?.data);

                if(response.data) {
                    console.log ("The auth response..");
                    console.log(response.data);

                    setFN(response.data.firstName);
                    //setLN(response.data.lastName);
                    setUser(JSON.parse(JSON.stringify(response.data)))

                    //updating user context ...!!!
                    updateUser (JSON.parse(JSON.stringify(response.data)));
                   //Cookies.set("user",   JSON.stringify(response.data),{ path: '/', maxAge: 500 });
                   //Cookies.set("user",   JSON.stringify(response.data));

                    Cookies.set("firstName", response.data.firstName);
                    
                    Cookies.set("userRoles",   JSON.stringify(response.data.roles));

                    console.log("The user roles: ",JSON.stringify(response.data.roles))


                }
                //window.location.reload(false);

               // setAuth("true");

                console.log("Is user auth? ",isUserAuth);

                setHomePage("homepage")
                
                
                //setSuccess(true);
            
            } catch (err) {
                console.log("error....Is user auth? ",isUserAuth);
                console.log(err);
            }
            
            }

        
        return (
            
           


            <div className="parentdiv"> 
              
        
            <div className="logincontainer">
            <div className="firstNav">
                <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                 <span className="homeLinks" onClick={()=> setHomePage("login")}> login</span></h6>
                </div> 


            <h1>Login here</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">
                Email:
            </label>
            <input {...register("email")}/>
            <p>

            </p>

            <label htmlFor="password">
                Password:
            </label>
            <input {...register("password")}/>

            <p>

            </p>

            <button>Login</button>

            </form>


            </div>


        </div>
       
            
        )

    }
    

export default Login