import { useUser, useUserUpdate  } from "./user/UserContext";
import UserProfile from "./UserProfile";
import Cookies from 'js-cookie';

import { useEffect, useState } from "react";
import Login from "./Login";
import UserRoles from "./user/UserRoles";
import UserDetails from "./user/UserDetails";


import { useParams } from "react-router-dom";
import AppService from "../services/AppService";
import UserService from "../services/UserService";


//function Content(props) {
   

    const Content = (props) => {
        const [tartget, setTarget] = useState("");
        const [tartgetUser, setTargetUser] = useState({});
        const user = useUser();
        const { id } = useParams();
    const updateUser = useUserUpdate();

    

    useEffect(()=>{
        console.log("The user to target is:...", user);
        
        //if(Cookies.get("user")) {
            if(user.id) {
                setTarget(props.target);
                console.log("Settinng target to ...",props.target);
                console.log("The user id",  id);

            }
            //const authUser = JSON.parse(Cookies.get("user"));
           
        console.log("The target Component is ", props.target);
        console.log("The user id..1",  id);

        UserService.getUserById(id).then(response => {
            setTargetUser(response.data);
            updateUser(response.data);
            console.log("The from param user is: ",response.data);

        }).catch(err => {
            console.log("error fetching user.... ");
        })
        
    
       // }
        
    },[id])

    switch(props.target) {
        case "user-profile" : return (<UserProfile user={user}/> );
        case "user-roles" : return (<UserRoles user={user}/> );
        case "user-images" : return (<UserDetails user={id?tartgetUser:user}/> );
    }


    return(
        <Login target="log-in"/>          
       
    );
   
}

export default Content