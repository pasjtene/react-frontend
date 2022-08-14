import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import LoginComponent from "./component/LoginComponent";
import UserComponent from "./component/UserComponent";
import Login from "./component/Login";
import UserService from "./services/UserService";
import Navbar from "./Navbar";

//const USER_REGEX = /^[a-ZA-Z][a-zA-Z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%/:,."']).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = "/api/register";
//const API_URL = "http://localhost:8085/api/register ";
const mylocation = window.location.origin;

const Register = () => {
   const userRef = useRef();
   const errRef = useRef();

   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');

   const [user, setUser] = useState('');
   const [firstName, setFirstName] = useState('');
   
   const [validName, setValidName] = useState(false);
   const [validFirstName, setValidFirstName] = useState(false);

   const [userFocus, setUserFocus] = useState(false);

   const [password, setPwd] = useState('');
   const [validPwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

   const [matchPwd, setMatchPwd] = useState('');
   const [validMatch, setValidMatch] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

   const [errMsg, seterrMsg] = useState('');
   const [success, setSuccess] = useState(false);

   const [homePage, setHomePage] = useState("home");
   const [api_url, setRegisterUrl] = useState("");


   useEffect( () => {
       const result = USER_REGEX.test(user);
       console.log(result);
       console.log(user);
       setValidName(result);
   }, [user])


   useEffect( () => {
    const result = firstName.length >= 2 && firstName.length < 20
    console.log(result);
    console.log(firstName);
    setValidFirstName(result);
}, [firstName])

   


   useEffect( () => {
       const result = EMAIL_REGEX.test(email);
       console.log("email valid: ", result);
       console.log("The email: ",email);
   }, [email])

   useEffect( () => {
    const result = lastName.length >= 2;
    console.log("lastlame valid valid: ", result);
    console.log("The last name: ",lastName);
}, [lastName])

   useEffect( () => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
}, [password, matchPwd])

useEffect( () => {
    seterrMsg('');
}, [user, password, matchPwd])


const handleSubmit = async (e) => {
e.preventDefault();
//const v1 = USER_REGEX.test(user);
const v1 = USER_REGEX.test(firstName);
const v2 = PWD_REGEX.test(password);

if(!v1 || !v2) {
 seterrMsg("Invalid Entry");
 console.log(JSON.stringify({firstName, lastName, email, password}))
 return;
}


try {
    //const response = await axios.post(api_url, JSON.stringify({firstName, lastName, email, password}),
    const response = await UserService.registerUser(JSON.stringify({firstName, lastName, email, password})

    );
    console.log(response?.data);
    setSuccess(true);
    //return;

} catch (err) {
    console.log(err);
}

}


switch(homePage) {
    case "register" : return (
        <div>
    
            <Register/>
        </div>
    );

    case "login": return (<Login/>);
    case "userlist": return (<div> <UserComponent/> </div>);
}

    return (
        <>
        
        { success ? (
            <div>
                <h1>Success!</h1>
                <Login/>
            </div>
        ): 
        
        (
        <div>
            <Navbar/>   

            <div className="firstNav">
                <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                 <span className="homeLinks" onClick={()=> setHomePage("login")}> login</span></h6>
                </div>
            <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg} </div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    First Name:
                </label>
                <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                //onChange={(e) => setUser(e.target.value)}
                onChange={(e) => setFirstName(e.target.value)}
                

                value={firstName}
                required
                aria-invalid={validName ? "false": "true"}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                />

                <div id="uinote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters. <br/>
                    Must begin with a letter. <br/>
                    Letter, numbers, underscores, hyphens allowed.
                </div>

                <label htmlFor="lastname">
                    Last Name:
                </label>

                <input type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                />

                <label htmlFor="email">
                    Email:
                </label>

                <input type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />

                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                </label>

                <input type="password" id="password"
                onChange={(e) => setPwd(e.target.value)} 
                value={password}
                onFocus={() => setPwdFocus(true)}
                />

                <div id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    8 to 24 characters. <br/>
                    Must include uppercase and lowercase, a number and a speciat charecter. <br/>
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </div>

                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid":"hide"}/>
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide":"invalid"}/>
                </label>

                <input type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)}/>

                <p>
                </p>

                <button disabled={!validFirstName}>Sign Up</button>
            </form>

            <div>
                <h6>Already a member? <span onClick={() => setHomePage("login")}> Sign in</span> </h6>
            </div>

        </div>
    )}
    </>
    )
    
}

export default Register