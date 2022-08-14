import React from "react";
import { useState } from "react";
import Register from "../Register";
import Login from "./Login";
import UserComponent from "./UserComponent";
//import AddUserComponent from "./AddUserComponent";
import AddUser from "./AddUserComponent";
import UserService from "../services/UserService";
import NavBarComponent from "./NavBarComponent";




    const HomeComponent = () => {
        const [homePage, setHomePage] = useState("");
        console.log("Is user auth ?.. from home component....", UserService.getAuthCookie());

        switch (homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "adduser": return (<div> <AddUser/> </div>);
            

        }


if(UserService.getAuthCookie()==="true") {

    return (

        <div>

            <div className="firstNav">

        
            <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
            <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
             
             <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span></h6>
             <span className="homeLinks" onClick={()=> setHomePage("login")}> logout</span>

            </div>

            <div>
                Welcome to the react and spring boot full stack secure app training ... We are logged in
            </div>
        </div>
    )


}
        
      else {


        return (

            <div>

                <div className="firstNav">

                <div> <NavBarComponent /> </div>
                <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                 
                 <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span></h6>
                    <span className="homeLinks" onClick={()=> setHomePage("login")}> login</span>
            
                </div>

                <div>
                    Welcome to the react and spring boot full stack secure app training ... We are NOT auth
                </div>
            </div>
        )


      }

    }
    

export default HomeComponent