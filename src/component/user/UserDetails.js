
import React from "react";
//import UserService from "../services/UserService";
//import HomeComponent from "./HomeComponent";
//import Register from "../Register";
//import Login from "./Login";
//import AddUser from "./AddUserComponent";
import UploadFile from "../UploadFile";
//import Cookies from 'js-cookie';
//import UserComponent from "./UserComponent";
//import { useUser, useUserUpdate} from "./user/UserContext";
//import { UserContext } from "./Login";
//import { useUser, useUserUpdate} from "./user/UserContext";

const IMAGE_URL = "http://51.68.196.188:8080";

const mylocation = window.location.origin;



class UserDetails extends React.Component {
   // const authUser = JSON.parse(Cookies.get("user"));
   //static contextType = UserContext;
   

    constructor(props) {                
        super(props)

        this.state = {
            //users:[],
            homePage: "uselist",
            profileImagePath: "",
            user: {}
        }
        
    }

    componentDidMount() {
       
        
        console.log("The user cookie was removed...");

     
    }

    

    render () {
        
        
        switch (this.state.homePage) {
            //case "register" : return (<div> <Register /> </div>);
            //case "login": return (<div> <Login/> </div>);
            //case "userlist": return (<div> <UserComponent/> </div>);
            //case "adduser": return (<div> <AddUser/> </div>);
        
        }

         return (
          // <UserContext.Consumer >

          // {(user) => {
          //return
            
            <div className="parentdiv"> 



            <UploadFile/>
        
            
                <div className="container">

                <img src={window.location.origin + ':8080/images/'+ this.props.user.profileImagePath} />
                    

                        <h1 className="text-center">User details for ..1 {this.props.user.firstName}</h1>
                        
                
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>pic</td>
                                    <td>Id</td>
                                    <td>First name</td>
                                    <td>last Name</td>
                                    <td>email</td>
                                    
                                    <td>User username</td>
                                    <td>Roles</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    <tr>
                                        <td>
                                        
                            
                                        <img className="imgthumbnail"
                                         src={window.location.origin + ':8080/images/'+  this.state.user.profileImagePath} />
                                       
                                        <img className="imgthumbnail" src={window.location.origin + '/'+ "logo192.png"} />
                                        </td>
                                        <td> {this.props.user.id}</td>
                                        <td>{this.props.user.firstName}</td>
                                        <td>{this.props.user.lastName}</td>
                                        <td>{this.props.user.email}</td>
                                        
                                        <td>{this.props.user.username}</td>
                                        <td>{this.props.user.roles? this.props.user.roles.map(role=>role.name+", "):""}</td>
                                        
                                        
                                    </tr>
                                }
                            </tbody>
                        </table>



                </div>

                
            </div>
            // }}
            //</UserContext.Consumer>
        )
    }

}


//const UserDetails = (props) {}





export default UserDetails