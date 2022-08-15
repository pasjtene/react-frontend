import React from "react";
import { useState, useContext } from "react";
import Register from "../Register";
import UserComponent from "./UserComponent";
import { useForm } from "react-hook-form";
import axios from "axios";
import UserService from "../services/UserService";
import HomeComponent from "./HomeComponent";

import { ReactDOM } from "react";

import {  AuthContext } from "../Navbar";
import Navbar from "../Navbar";


const AUTH_URL = "http://localhost:8085/api/authenticate";



    
    
    const Login = () => {
        const [homePage, setHomePage] = useState("home");
        const { isUserAuth } = useContext(AuthContext)
       const [isAuth, setAuth ] = useContext(AuthContext);

        const { register, handleSubmit } = useForm({
            defaultValues: {
                username: "",
                password: "",
                email: ""
              }
        });

        switch (homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "homepage": return (<div> <HomeComponent/> </div>);
        
        }



        const onSubmit = async (data,e) => {  
            e.preventDefault();
            console.log("The data: ", data);
            
            
            try {
                const response = await UserService.authenticate(JSON.stringify(data));
                
                console.log(response?.data);
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