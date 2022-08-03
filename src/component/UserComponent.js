import React from "react";
import UserService from "../services/UserService";
import HomeComponent from "./HomeComponent";
import Register from "../Register";
import Login from "./Login";
import AddUser from "./AddUserComponent";

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
             
            <div>
                <div className="firstNav">
                <h6>
                <span className="homeLinks" onClick={()=>{this.setState({ homePage: "userlist"}) }}> list of courses </span>
                <span className="homeLinks" onClick={()=> {this.setState({ homePage: "register"}) }}>Register</span>
                 <span className="homeLinks" onClick={()=> {this.setState({ homePage: "login"}) }}> login</span>
                 <span className="homeLinks" onClick={()=> {this.setState({ homePage: "adduser"}) }}> Add user</span> 
                 </h6>
                
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
                                <td>{user.password}</td>
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