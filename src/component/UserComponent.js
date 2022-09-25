import React from "react";
import UserService from "../services/UserService";
import Register from "../Register";
import Login from "./Login";
import AddUser from "./AddUserComponent";
import UploadFile from "./UploadFile";
import NotAuthorized from "./NotAuthorized";
import UserDetails from "./user/UserDetails";


 


class UserComponent extends React.Component {

    constructor(props) {                
        super(props)
        this.state = {
            users:[],
            homePage: "uselist",
            responseStatus: 0,
            user: {}
        }
        
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data});
            console.log("The response status: ", response.status);
        }).catch((error)=>{
            //console.log("Error getting users...",e)
            if (error.response) {
                this.setState({responseStatus: error.response.status})
                
                console.log("Error getting users...status..", error.response.status);
                //console.log("Error getting users...headers...", error.response.headers);
                console.log("Error getting users...data...", error.response.data);
              }
        });
    }



     handleUser = (id) => {

       const user = this.state.users.length?this.state.users.map(user => { 
        if(user.id == id){
            this.setState({user: user});
            return user

        }
        }):{}

       
        this.setState({homePage: "userDetails"})
        window.history.pushState({}, null, "/users/details/images");

        //return user;
    }



   
   

    

    

    render () {

        
        switch (this.state.homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "adduser": return (<div> <AddUser/> </div>);
            case "userDetails": return (<div> <UserDetails user={this.state.user}/> </div>);
        
        }

        if(this.state.responseStatus === 403) {
            console.log("Users are empty, returning login");
            return (<div> <Login/> </div>);
        }

        if(this.state.responseStatus === 401) {
            console.log("User Not allowed to accress page");
            return (<div> <NotAuthorized/> </div>);
        }

        if(this.state.users.length === 0) {
            console.log("Users are empty, returning login");
            return (<div> <Login/> </div>);
        }
        




         return (
             
            <div className="parentdiv"> 

        

                <div className="container">

                    

                        <h1 className="text-center">List of users</h1>
                
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>User Id</td>
                                    <td>User First name</td>
                                    <td>User last Name</td>
                                    <td>User email</td>
                                    <td>User passwd</td>
                                    <td>User username</td>
                                    <td>Roles</td>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    this.state.users.length?this.state.users.map(user => <tr key = {user.id}>
                                        <td id={user.id}  onClick={(e)=>{this.handleUser(e.target.id)}}>{user.id} </td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td className="userpass">{user.password}</td>
                                        <td>{user.username}</td>
                                        <td>{user.roles.map(role=>role.name+", ")}</td>
                                    </tr>):console.log("None")
                                    
                                }
                            </tbody>
                        </table>



                </div>

                
            </div>
        )
    }

}

export default UserComponent;