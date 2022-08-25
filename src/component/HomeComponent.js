import React from "react";
import { useState, useEffect } from "react";
import Register from "../Register";
import Login from "./Login";
import UserComponent from "./UserComponent";
//import AddUserComponent from "./AddUserComponent";
import AddUser from "./AddUserComponent";
import UserService from "../services/UserService";
import NavBarComponent from "./NavBarComponent";
import Navbar from "../Navbar";
import Cookies from 'js-cookie';






    const HomeComponent = () => {
        const [homePage, setHomePage] = useState("");
        const [userFN, setFN] = useState("Guest");
        const [userLN, setLN] = useState("");
        const authUser = JSON.parse(Cookies.get("user"));
        
        


        useEffect(()=>{
            console.log("The number of users to delete: ", userFN);
            setFN(authUser.firstName);
            setLN(authUser.lastName);
        },[userFN])


        console.log("Is user auth ?.. from home component....", UserService.getAuthCookie());
        console.log("The user FN from home component...", Cookies.get("firstName"));
        console.log("The user from FN2 home component...", authUser.firstName);
        //setFN(authUser.firstName);

        switch (homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "adduser": return (<div> <AddUser/> </div>);
            

        }

       


if(UserService.getAuthCookie()==="true") {

    return (

        <div className="container">
                <div className="parentdiv"> 

                            <div className="firstNav">
                                <h6>
                                    <span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                                    <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                                    <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span>
                                </h6>
                                <span className="homeLinks" onClick={()=> setHomePage("login")}> logout</span>
                            <div>
                                <div>
                                Welcome Welcome {userFN} {userLN}
                                </div>
                        

                        to the react and spring boot full stack secure app training ... We are logged in
                </div>
        </div>
        </div>

        </div>
    )


}
        
      else {


        return (

            
            <div>
                

                <div className="parentdiv"> 

                   

                    <div className="container">

                    <div className="firstNav">

                        <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                        <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>

                        <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span></h6>
                            <span className="homeLinks" onClick={()=> setHomePage("login")}> login</span>

                    </div>

                    <div>
                    
                    
                     to the react and spring boot full stack secure app training ... We are NOT auth
                    </div>

                    </div>

                
            </div>





            </div>
            
            
            
            
            
        )


      }

    }
    

export default HomeComponent