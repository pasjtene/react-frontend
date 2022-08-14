import React from "react";
import UserService from "../services/UserService";
import HomeComponent from "./HomeComponent";
import Register from "../Register";
import Login from "./Login";
import AddUser from "./AddUserComponent";
import Navbar from "../Navbar";

class UserComponent extends React.Component {

    constructor(props) {                
        super(props)
        this.state = {
            users:[],
            homePage: "uselist"
        }
        
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data})
        });
    }

    

    render () {

        
        switch (this.state.homePage) {
            case "register" : return (<div> <Register /> </div>);
            case "login": return (<div> <Login/> </div>);
            case "userlist": return (<div> <UserComponent/> </div>);
            case "adduser": return (<div> <AddUser/> </div>);
        
        }

         return (
             
            <div className="parentdiv"> 


                <div className="navDiv">
                    <Navbar/>
                </div>
                 
            
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
                            this.state.users.map(user => <tr key = {user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td className="userpass">{user.password}</td>
                                <td>{user.username}</td>
                                <td>{user.roles}</td>
                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}

export default UserComponent;