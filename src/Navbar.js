import { Link, useMatch, useResolvedPath } from "react-router-dom";
import UserService from "./services/UserService";
import { useState, useEffect, createContext } from "react";

//export const SampleContext = createContext("");
export const AuthContext = createContext("");
const mylocation = window.location.origin;

    

    

export default function Navbar({ children, settings }) {
    //console.log("Is user auth ?.. from navbar component....", UserService.getAuthCookie());

    const [currentSettings, setCurrentSettings] = useState(settings  );
        
     

      const saveSettings = (values) => {setCurrentSettings(values)};
        
       
    
    const isUserAuth = UserService.getAuthCookie();
    //setCurrentSettings(isUserAuth);
    //const [isUserAuth, setAuth] = useState('');
    const [isAuth, setAuth] = useState('');
    //const  isUserAuth = UserService.getAuthCookie();

    useEffect( () => {
        const  isAuth = UserService.getAuthCookie();
          //console.log("user auth: ", isUserAuth2);
      }, [isAuth])



    return (


        <nav className="nav">


        <AuthContext.Provider 
        value={{ settings: currentSettings, saveSettings }}
        >
            
            {children}

        </AuthContext.Provider>
            <Link to="/" className="site-title">
            Talodu home
            </Link>

            <ul>
            <li>
                    <CustomLink to="/user/add">Add user</CustomLink>
                </li>
                
                <li>
                    <CustomLink to="/users/list">Liste Users</CustomLink>
                </li>

                <li>
                <CustomLink to="/register">Register</CustomLink>
                </li>

                <li>
                    {isUserAuth === "true" ? <CustomLink to={mylocation === "http://localhost:3000"? "/api/logout":"/talodu/api/logout"}>Logout</CustomLink>: 
                    <CustomLink to= {mylocation === "http://localhost:3000"? "/api/login":"/talodu/api/login"} >Login</CustomLink> }
                </li>


            </ul>
        </nav>
    );
}

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