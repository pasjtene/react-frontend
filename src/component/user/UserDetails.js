
import React, { useState } from "react";
import { useUser, useUserUpdate  } from "./UserContext";
import { useEffect } from "react";

import UserLeftSideNav from "./UserLeftSideNav";
import UploadFile from "../UploadFile";
import UserRoles from "./UserRoles";
import UserImages from "./UserImages";
import AppService from "../../services/AppService";
import UserInfo from "./UserInfo";
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
       //console.log("The user to target is:...", user);
       updateUser(props.user);
       
       //if(Cookies.get("user")) {
           if(props.user.id) {
            
               updateUser(props.user);
               setUser(props.user);

           }
         
    
   },[updatedUser])
        
        switch ({homePage}) {

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
        <span className='left-nav-item' onClick={(e)=>{setHomePage("info")}}>Personal details</span>
        
    </div>

                <div className="container">

                
                <h5 className="text-center">User details for ..1 {user.fullName} </h5>
                    <div className="user-detail">

                    <img className="imgmidsize"  src={AppService.show_image_url(user.profileImagePath) } />

                    <div>
                    <h6>Name: {user.firstName} </h6> 
                    <h6>email: {user.email} </h6> 
                    <h6>Age: {user.age}</h6>
                    <h6>roles: {user.roles? user.roles.map(role=>role.name+", "):""}</h6>
                    </div>
                
                    </div>
                   
                                {homePage=="roles"?<UserRoles/>:null}
                                {homePage=="images"?<UserImages user={user}/>:null}
                                {homePage=="info"?<UserInfo user={user}/>:null}
                                {props.homePage=="images"?<UserImages user={props.user}/>:null}
                                {props.homePage=="info"?<UserInfo user={props.user}/>:null}
                       
                    </div>

            
            </div>
           
        )
    }

//}


export default UserDetails