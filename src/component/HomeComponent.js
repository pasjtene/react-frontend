import React from "react";
import { useState } from "react";
import Register from "../Register";
import Login from "./Login";
import UserComponent from "./UserComponent";
//import AddUserComponent from "./AddUserComponent";
import AddUser from "./AddUserComponent";



    
    
    const HomeComponent = () => {
        const [homePage, setHomePage] = useState("");

        switch (homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "adduser": return (<div> <AddUser/> </div>);
            

        }

        
        return (
            <div>
                <div className="firstNav">
                <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                 <span className="homeLinks" onClick={()=> setHomePage("login")}> login</span>
                 <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span></h6>
                </div>

                <div>
                    Welcome to the react and spring boot full stack secure app training
                </div>
            </div>
        )

    }
    

export default HomeComponent