import React from "react";
import { useState } from "react";
import UserService from "../services/UserService";
import HomeComponent from "./HomeComponent";
import Register from "../Register";
import Login from "./Login";
import AddUser from "./AddUserComponent";
import Navbar from "../Navbar";
import { SampleContext } from "../Navbar";
import Cookies from 'js-cookie';

class Logout extends React.Component {

   // const { variableOne, Url } = useContext(SampleContext)

    constructor(props) {                
        super(props)
        this.state = {
            users:[],
            homePage: "uselist"
        }
        
    }

    

    componentDidMount() {
        UserService.logOut().then((response) => {
            this.setState({ homePage: "login"})
            
            //Navbar().setAuth("false");

            //window.location.pathname = "/login";
            
           //window.location.reload(false);
        });
    }

    

    render () {



        
        switch (this.state.homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
        
            case "adduser": return (<div> <AddUser/> </div>);
        
        }

         return (
             
            <div>
                <Login/>
                 
            
                <h1 className="text-center">This is the logout page</h1>
                
                

            </div>
        )
    }

}

export default Logout;