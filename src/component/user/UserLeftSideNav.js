import { useState } from "react";
import UserRoles from "./UserRoles";
import { useUser } from "./UserContext";
import { Link, useMatch, useResolvedPath } from "react-router-dom";


const UserLeftSideNav = () => {
    const user = useUser();


    const [homePage, setHomePage] = useState("");



    switch (homePage) {
        //case "register" : return (<div> <Register /> </div>);
        //case "login": return (<div> <Login/> </div>);
        //case "userlist": return (<div> <UserComponent/> </div>);
        case "roles": return (<div> <UserRoles user={user}/> </div>);
    
    }

    return (
        <div className="left-side-nav">
       {user.firtsName}
        <span className="left-nav-item" >images</span>
        <span className='left-nav-item'>Videos</span>
        <span className='left-nav-item'>Audios</span>
        <span className='left-nav-item'>Friends</span>
        <span className='left-nav-item'>Messages</span>
        <span className='left-nav-item'>Shops</span>
        <span className='left-nav-item' onClick={(e)=>{setHomePage("roles")}}>Roles</span>
        <span className='left-nav-item'>Pages</span>
        
    </div>
    )
}

export default UserLeftSideNav

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    
    return (
        <ul className={isActive ? "active" : " "}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </ul>
    );
}