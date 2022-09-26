
import React, { useState } from "react";
import { useUser, useUserUpdate  } from "./UserContext";
import { useEffect } from "react";

import UserLeftSideNav from "./UserLeftSideNav";
import UploadFile from "../UploadFile";
import UserRoles from "./UserRoles";
import UserImages from "./UserImages";
import AppService from "../../services/AppService";
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


                <div className="container">

                
                <h1 className="text-center">User details for ..1 {props.user.firstName}</h1>
                    <div className="user-detail">

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

                    <img className="imgmidsize"  src={AppService.show_image_url(user.profileImagePath) } />

                    <div>
                    <h1> {user.firstName} {props.user.lastName}</h1>
                    <h4> {user.email}</h4>
                    <h4>{user.roles? user.roles.map(role=>role.name+", "):""}</h4>
                    </div>
                
                    </div>
                   
                                {homePage=="roles"?<UserRoles/>:null}
                                {homePage=="images"?<UserImages user={user}/>:null}
                                {props.homePage=="images"?<UserImages user={user}/>:null}
                       
                </div>

            
            </div>
           
        )
    }

//}


export default UserDetails