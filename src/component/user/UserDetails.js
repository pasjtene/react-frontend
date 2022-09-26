
import React, { useState } from "react";
import { useUser, useUserUpdate  } from "./UserContext";
import { useEffect } from "react";

import UserLeftSideNav from "./UserLeftSideNav";
import UploadFile from "../UploadFile";
import UserRoles from "./UserRoles";
import UserImages from "./UserImages";
//import Cookies from 'js-cookie';


const IMAGE_URL = "http://51.68.196.188:8080";

const mylocation = window.location.origin;


const UserDetails = (props) => {
//class UserDetails extends React.Component {
   // const authUser = JSON.parse(Cookies.get("user"));
   //static contextType = UserContext;

   const [homePage, setHomePage] = useState("");
   //const [user, setUser] = useState({});

   
  // useUserUpdate(this.props.user);
   const user = useUser();
   const updateUser = useUserUpdate();
   const [updatedUser, setUser] = useState({});

   
   //const updateUser = useUserUpdate();

   useEffect(()=>{
       console.log("The user to target is:...", user);
       
       //if(Cookies.get("user")) {
           if(user.id) {
               
               console.log("Settinng target to ...",props.user);
               updateUser(props.user);
               setUser(user);

           }
           //const authUser = JSON.parse(Cookies.get("user"));
          
       console.log("The target Component is ", props.user);

       

      // }
       
   },[updatedUser])
        
        switch ({homePage}) {
            //case "register" : return (<div> <Register /> </div>);
            //case "login": return (<div> <Login/> </div>);
            //case "userlist": return (<div> <UserComponent/> </div>);
            case "roles1": return (<div> <UserRoles user={this.props.user}/> </div>);
        
        }



         return (
         
            
            <div className="parentdiv"> 

<div className="left-side-nav">
       {props.user.firtsName}
        <span className="left-nav-item" onClick={(e)=>{setHomePage("images")}} >images</span>
        <span className='left-nav-item'>Videos</span>
        <span className='left-nav-item'>Audios</span>
        <span className='left-nav-item' onClick={(e)=>{setHomePage("friends")}} >Friends</span>
        <span className='left-nav-item' onClick={(e)=>{setHomePage("messages")}} >Messages</span>
        <span className='left-nav-item'>Shops</span>
        <span className='left-nav-item' onClick={(e)=>{setHomePage("roles")}}>Roles</span>
        <span className='left-nav-item'>Pages</span>
        
    </div>


            
                <div className="container">

                <img className="imgmidsize" src={window.location.origin + ':8080/images/'+ props.user.profileImagePath} />
                    

                        <h1 className="text-center">User details for ..1 {props.user.firstName}</h1>
                        
                
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
                                         src={window.location.origin + ':8080/images/'+  props.user.profileImagePath} />
                                       
                                        <img className="imgthumbnail" src={window.location.origin + '/'+ "logo192.png"} />
                                        </td>
                                        <td> {props.user.id}</td>
                                        <td>{props.user.firstName}</td>
                                        <td>{props.user.lastName}</td>
                                        <td>{props.user.email}</td>
                                        
                                        <td>{props.user.username}</td>
                                        <td>{user.roles? user.roles.map(role=>role.name+", "):""}</td>
                                        
                                        
                                    </tr>
                                }
                            </tbody>
                        </table>

                                {homePage=="roles"?<UserRoles/>:null}
                                {homePage=="images"?<UserImages user={user}/>:null}
                                {props.homePage=="images"?<UserImages user={user}/>:null}
                        

                </div>

            
        

                
            </div>
           
        )
    }

//}


export default UserDetails