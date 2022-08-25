import React from "react";
import UserService from "../services/UserService";
import HomeComponent from "./HomeComponent";
import Register from "../Register";
import Login from "./Login";
import AddUser from "./AddUserComponent";
import UploadFile from "./UploadFile";
import Cookies from 'js-cookie';
import UserComponent from "./UserComponent";

const authUser = JSON.parse(Cookies.get("user"));



class UserProfile extends React.Component {
   // const authUser = JSON.parse(Cookies.get("user"));

    constructor(props) {                
        super(props)
        this.state = {
            users:[],
            homePage: "uselist",
            profileImagePath: ""
        }
        
    }

    componentDidMount() {
       
       UserService.getUsers().then((response) => {
        this.setState({ users: response.data})
            this.setState({ profileImagePath: authUser.profileImagePath})
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



<UploadFile/>
        

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
                                    this.state.users.map(user => <tr key = {user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td className="userpass">{user.password}</td>
                                        <td>{user.username}</td>
                                        <td>{user.roles}</td>
                                        <td>
                                        
                                        
                                        <img src={process.env.PUBLIC_URL + user.profileImagePath} />
                                        <img src={window.location.origin + '../img/'+ user.profileImagePath} />
                                        </td>
                                        
                                    </tr>)
                                }
                            </tbody>
                        </table>



                </div>

                
            </div>
        )
    }

}

export default UserProfile;