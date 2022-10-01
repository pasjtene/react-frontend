import { Link, useMatch, useResolvedPath } from "react-router-dom";
import UserService from "./services/UserService";
import { useState, useEffect, createContext, useRef } from "react";
import  {ReorderIcon} from "@mui/icons-material";
import { SearchIcon } from "react-router-dom";
import { Reorder } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { useUser } from "./component/user/UserContext";
import Cookies from 'js-cookie';


//export const SampleContext = createContext("");
export const AuthContext = createContext("");
const mylocation = window.location.origin;
const estartedAt = Date.now();

function setTimeElapsed(){
    //console.log("Starting time:..",estartedAt);
    //console.log("the interval..",setETime1);


    //if we don't use dates, the setTimeout does not run on idle tab.

    var elapsedETime = Date.now() - estartedAt;
    //Total number of seconds
    var sec = Math.floor(elapsedETime/1000);

    return sec;

}   

    

export default function Navbar({ children, settings }) {
    //console.log("Is user auth ?.. from navbar component....", UserService.getAuthCookie());

    const [currentSettings, setCurrentSettings] = useState(settings  );
    const [showLinks, setShowLinks] = useState(false);
    const ref = useRef(null);

    const [user, setUser] = useState({});
    const [isUserAuth, setUserAuth] = useState('');
    const [isAuth, setAuth] = useState('');
    const [isAuthVal, setAuthVal] = useState('LogIn');
    
        
     

      const saveSettings = (values) => {setCurrentSettings(values)};
        
       
    
    //const isUserAuth = UserService.getAuthCookie();
    //setCurrentSettings(isUserAuth);

    const loginUser = useUser();
    
    //const  isUserAuth = UserService.getAuthCookie();

    useEffect( () => {
        const  isAuth = UserService.getAuthCookie();
          //console.log("user auth: ", isUserAuth2);

          setTimeout(() => {
            const userString = UserService.getAuthCookie();
            //const user = JSON.parse(userString);
            //console.log("");
           // setUser(user);
            setAuth(userString);
            //console.log("Setting aut value.....",userString);

            if(setTimeElapsed()%5 >3 ) {
                setAuth(userString);
                //console.log("Seconds passed: ",setTimeElapsed()%5);
            }

            

            }, 5000)

      },[isAuth])


      useEffect( () => {
        const  isAuth = UserService.getAuthCookie();
         
          let count = 0;

          setInterval(() => {
            const userString1 = UserService.getAuthCookie();
            const reloaded = Cookies.get('reloaded');
           

            if(userString1 === "true") {
                setAuthVal("LogOut");
               
            } else {
                //reloaded = 1;

                
                setAuthVal("LogIn");
               
                if(reloaded  != "true"){
                   
                    Cookies.set("reloaded", "true");
                    window.history.pushState({}, null, "/api/login");
                    //console.log("The user is.loged out.",loginUser.id)
                    window.location.reload();
    
                } 
  
            }

            if(setTimeElapsed()%5 >3 ) {
                setAuth(userString1);
                setUserAuth(userString1);
                //console.log("Seconds passed: ",setTimeElapsed()%5);
            }

            //console.log("Setting aut value.....",userString1);
            }, 1000)

            

            



      },[isUserAuth])



    return (

        <div>

<nav className="nav">

            <div>
                <Link to="/" className="site-title">
                    Talodu home
                </Link>
            </div>

            <div >

                    <ul>
                        

                        <li>
                        <CustomLink to="/register">Register</CustomLink>
                        </li>

                        <li>
                            {isAuth || isUserAuth === "true" ? 
                            <CustomLink id="loginout" to={mylocation === "http://localhost:3000"? "/api/logout":"/talodu/api/logout"}>{isAuthVal}</CustomLink>: 
                            <CustomLink  id="loginout" to= {mylocation === "http://localhost:3000"? "/api/login":"/talodu/api/login"} >{isAuthVal}</CustomLink> }
                        </li>


                    </ul>

            </div>
        </nav>

        <div className="navBar">

        <div className="leftSide">

        <ul className="Links1" >
            
                        {
                        UserService.hasRole("ROLE_SUPER_ADMIN")?
                         <li>
                            <CustomLink to="/user/add">Add user</CustomLink>
                        </li>
                        : ""
                         }
                        
                        <li>
                            <CustomLink to="/users/list">Liste Users</CustomLink>
                        </li>
                     
                       

                        <li>
                        <CustomLink to="/register">Register</CustomLink>
                        </li>

                        <li>
                        <CustomLink to="/api/profile">My profile</CustomLink>
                        </li>

                        <li>
                            {isAuth || isUserAuth === "true" ? 
                            <CustomLink id="loginout" 
                            to={mylocation === "http://localhost:3000"? "/api/logout":"/talodu/api/logout"}>{isAuthVal}
                            </CustomLink>: 
                            <CustomLink  id="loginout" 
                            to= {mylocation === "http://localhost:3000"? "/api/login":"/talodu/api/login"} >{isAuthVal}
                            </CustomLink> }
                        </li>

            
                  
        </ul>


        
            <div  >
            <ul className="Links" id={showLinks ? "hidden": ""} >

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
                        <CustomLink to="/api/profile">My profile</CustomLink>
                        </li>

                        <li>
                            {isAuth || isUserAuth === "true" ? 
                            <CustomLink id="loginout" to={mylocation === "http://localhost:3000"? "/api/logout":"/talodu/api/logout"}>{isAuthVal}</CustomLink>: 
                            <CustomLink  id="loginout" to= {mylocation === "http://localhost:3000"? "/api/login":"/talodu/api/login"} >{isAuthVal}</CustomLink> }
                        </li>
                        </ul>

            </div>
                  
    
        <button onClick={()=>setShowLinks(!showLinks)}><Reorder/></button>

            </div>

            <div className="rightSide">

                <input type="text" placeholder="search..."/>
                <button><Search/></button>

            </div>

        </div>


        </div>


        
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