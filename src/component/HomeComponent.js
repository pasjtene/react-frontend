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
import { UserContext } from "../App";
import { useUser, useUserUpdate} from "./user/UserContext";



import UserProfile from "./UserProfile";
//import { useUser } from "./Login";




    const HomeComponent = (props) => {
        const [homePage, setHomePage] = useState("");
        const [userFN, setFN] = useState("Guest");
        //const [userLN, setLN] = useState("");
        //const user = useUser();
        const user = useUser();
        const updateUser = useUserUpdate();
        
        
        
        useEffect(()=>{
            if(Cookies.get("user")) {
                const authUser = JSON.parse(Cookies.get("user"));
                //console.log("The number of users to delete: ", userFN);
            setFN(authUser.firstName);
            //setLN(authUser.lastName);
            updateUser();

            console.log("The user from FN2 home component...", authUser.firstName);

            }
            
        },[userFN])


        console.log("Is user auth ?.. from home component....", UserService.getAuthCookie());
        //console.log("The user FN from home component...", Cookies.get("firstName"));
       
        //setFN(authUser.firstName);

        switch (homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "adduser": return (<div> <AddUser/> </div>);
            

        }

       
if(UserService.getAuthCookie()==="true") {

    return (
            
                
        <Content />
       
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


    function Content() {
        const user = useUser();
        //const updateUser = useUserUpdate();

        useEffect(()=>{
            if(Cookies.get("user")) {
                const authUser = JSON.parse(Cookies.get("user"));
               
            console.log("The user from FN2 home component...", authUser.firstName);

            }
            
        },[user])





        return(
            
            //<UserContext.Consumer>
                //{user => (
                    //<UserProfile user={user}/>
                    <UserProfile user={user}/>
              //  )}
           // </UserContext.Consumer>
        );
    }
    

export default HomeComponent