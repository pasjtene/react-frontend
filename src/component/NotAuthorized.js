import React from "react";
import UserService from "../services/UserService";
import HomeComponent from "./HomeComponent";
import Register from "../Register";
import Login from "./Login";
import AddUser from "./AddUserComponent";
import UploadFile from "./UploadFile";
import { NotificationsPausedRounded, NotificationsPausedSharp } from "@mui/icons-material";

 



class NotAuthorized extends React.Component {

    constructor(props) {                
        super(props)
        this.state = {
            users:[],
            homePage: "uselist",
            responseStatus: 0
        }
        
    }

    componentDidMount() {
        console.log("Not Authorized Mounted")
    }

    

    

    render () {

        
        switch (this.state.homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            
            case "adduser": return (<div> <AddUser/> </div>);
        
        }

     




         return (
             
            <div className="parentdiv"> 



<UploadFile/>
        

                <div className="container">

                    

                        <h1 className="text-center">You don't have permission to view the requested page</h1>
                
                    
                </div>

                
            </div>
        )
    }

}

export default NotAuthorized;