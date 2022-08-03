import React from "react";
import { useState } from "react";
import Register from "../Register";
import UserComponent from "./UserComponent";
import { useForm } from "react-hook-form";
import axios from "axios";


const AUTH_URL = "http://localhost:8085/api/authenticate";



    
    
    const Login = () => {
        const [homePage, setHomePage] = useState("home");

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
        
        }



        const onSubmit = async (data,e) => {  
            e.preventDefault();
            console.log("The data: ", data);
            
            
            try {
                //const response = await axios.post(API_URL, JSON.stringify({firstName, lastName, email, password}),
                const response = await axios.post(AUTH_URL, JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json'}
            
                }
            
                );
                console.log(response?.data);
                
                
                //setSuccess(true);
            
            } catch (err) {
                console.log(err);
            }
            
            }

        
        return (
            <div>
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
        )

    }
    

export default Login