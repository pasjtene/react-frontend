import React from "react";
import { useState } from "react";
import UserService from "../services/UserService";
//import HomeComponent from "./HomeComponent";
import Register from "../Register";
import Login from "./Login";
import AddUser from "./AddUserComponent";
import UserComponent from "./UserComponent";



const NavBarComponent = () =>  {

    const [homePage, setHomePage] = useState("");
    

    //render () {

        
        switch (homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "adduser": return (<div> <AddUser/> </div>);
        
        }


       if(UserService.getAuthCookie()=="true") {

            console.log("The user is auth...form navbar");



            return 
            (
                <div>
                    <div className="firstNav">
                    <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                    <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                     
                     <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span></h6>
    
                        <span className="homeLinks" onClick={()=> setHomePage("login")}> logout</span>
                
                    </div>
        
                    <div>
                        Welcome to the react and spring boot full stack secure app training.. remove this
                    </div>
                </div>
            )




        } else {

            console.log("The user is NOT auth...form navbar");

            return 
            (
                <div>
                    <div className="firstNav">
                    <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                    <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                     
                     <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span></h6>
    
                   
                        <span className="homeLinks" onClick={()=> setHomePage("login")}> login</span>   
               
                     
                    </div>
        
                    <div>
                        Welcome to the react and spring boot full stack secure app training... remove this
                    </div>
                </div>
            )


        }


        }
//}

export default NavBarComponent