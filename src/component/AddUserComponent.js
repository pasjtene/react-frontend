import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import UserComponent from "./UserComponent";
import LoginComponent from "./LoginComponent";
import Login from "./Login";
import Register from "../Register";
import UserService from "../services/UserService";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import HomeComponent from "./HomeComponent";
import Navbar from "../Navbar";
import AppService from "../services/AppService";


axios.defaults.withCredentials = true;
const mylocation = window.location.origin;
 


//const USER_REGEX = /^[a-ZA-Z][a-zA-Z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%/:,."']).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = "/api/register";



const AddUser = () => {
   const userRef = useRef();
   const errRef = useRef();
   const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    }
  });
  const [data, setData] = useState([]);

  const [usersToDelete,setDataToDel]=useState({
    users:''
})
  

   const [users, setUsers] = useState([]);
   const [userAdded, setUserAdded] = useState(0);

   const [ssusers, setUsersToDelete] = useState("");
   const [userCookie, setUserCookie] = useState("");

   useEffect(()=>{
    console.log("The user roles...in add user..",UserService.hasRole("ROLE_SUPER_ADMIN"));


    UserService.getUsers().then(response => {
        console.log("The response in userEffect", response.data);
        setUsers(response.data);
        setData(response.data);
    }).catch((error)=>{
        //console.log("Error getting users...",e)
        if (error.response) {
            
            console.log("Error getting users...status..", error.response.status);
            //console.log("Error getting users...headers...", error.response.headers);
            console.log("Error getting users...data...", error.response.data);
          }
    });
    //setUserAdded(true)

}, [],userAdded)


const [selectedUsers, setSelectedUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState('');
const [selectedId, setSelectedId] = useState(0);
const [boxChecked, setBoxChecked] = useState(false);
const [nUsersToDelete, setNusersToDelete] = useState(0);
const [usersCSV, setUsersCSV] = useState("");
const [api_url, setRegisterUrl] = useState("");

useEffect( () => {
    
    //selectedUsers.push(selectedUser);
    setSelectedUsers([]);
    
    setSelectedId(selectedId);
    setBoxChecked(boxChecked);
    setSelectedUser(selectedId+boxChecked);
    //console.log("The selected users: ", selectedUsers);
}, [], selectedUser)

useEffect(()=>{
    console.log("The number of users to delete: ", nUsersToDelete);
},[nUsersToDelete])

const handleSelectedUser = (id, userSected) => {
    //setSelectedUser(id);
    
    console.log(id+userSected);
    
    
    var array = [...selectedUsers];
        const index = array.indexOf(id);

    if(userSected) {
        setSelectedUser(id+userSected);
        //setSelectedUser(id);

        console.log("Is user auth ?..", UserService.getAuthCookie());
        console.log("The user is selected");
        selectedUsers.push(id);

        setNusersToDelete(selectedUsers.length);
        
    } else {
        setSelectedUser(id+userSected);
        //console.log("The user is NOT selected");
        if (index > -1) { // only splice array when item is found
           array.splice(index, 1); // 2nd parameter means remove one item only
            setSelectedUsers(array);
            setSelectedUser(id+userSected);
            setNusersToDelete(array.length);
            console.log(Object.assign({}, array));
            
        }

    }
    
}

function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

function returnn(){
    console.log("The users is empty")

    return false;

}   




const handleDeleteUsers  = async (e, selectedUsers) => {  

    //const handleDeleteUsers = (selectedUsers) => {
    console.log(e);
    e.preventDefault(); 

    const userc = Cookies.get('user-id');
    //const userCookie = Cookies.get('user-id');
    setUserCookie(userc);

    const utodel = selectedUsers.map((e)=>e+",");

    setUsersCSV(...selectedUsers.map((e)=>e+","));


    getUsersCSV(...selectedUsers.map((userid)=>userid.trim()+","));

    //axios.defaults.withCredentials = true;
    const susers = {Selusers: selectedUsers.toString()};
    setUsersToDelete(selectedUsers.toString());

    setDataToDel({users:selectedUsers.toString()});

        
        
      //const DELETE_USERS_REST_API_URL = "http://localhost:8085/api/deleteusers";



      try {

        const response = await UserService.deleteUsersCSV(JSON.parse(JSON.stringify(selectedUsers)) );
            
            
        console.log(response?.data);
        if(response?.data.id !=0 ) {
            users.push(response?.data);
            setData(response.data);
            console.log("The data email", data[0].email);
            setUserAdded(data[0].email);
            
        } else {
            console.log("Le email est pris: ", response?.data.email);
        }
        
        //setSuccess(true);
    
    } catch (err) {
        console.log(err);
    }
       
    selectedUsers.map(id=>{
        removeById(users, id);
        setUserAdded("yes"+id);
    })
    setSelectedUsers([]);

}


const getUsersCSV = (userscsv) => {
console.log("The u CSV2: ", userscsv, userscsv.length);
console.log(JSON.stringify(console.log("json s", selectedUsers)))
}


const removeById = (arr, id) => {
    setUserAdded("no");
    const requiredIndex = arr.findIndex(el => {
       return el.id.toString() === id;
    });
    if(requiredIndex === -1){
       return false;
    };
    return !!arr.splice(requiredIndex, 1);
 };
 



   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');

   const [user, setUser] = useState('');
   const [firstName, setFirstName] = useState('');
   
   const [validName, setValidName] = useState(false);
   const [validFirstName, setValidFirstName] = useState(false);

   const [userFocus, setUserFocus] = useState(false);
   const [errMsg, seterrMsg] = useState('');
   const [success, setSuccess] = useState(false);

   const [homePage, setHomePage] = useState("home");


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




//const handleSubmit = async (e) => {
   
const onSubmit = async (data,e) => {  
    e.preventDefault();
    console.log("The data: ", data);

     /*
    if(mylocation === "http://localhost:3000") {
    console.log("Yes, we are local");
    setRegisterUrl("http://localhost:8086/api/register");
  //API_URL = "http://localhost:8086/api/register";

} else {
    console.log("We are on the server, we are not local");
    //API_URL =  'http://51.68.196.188:8080/talodu/api/register'

    setRegisterUrl("http://51.68.196.188:8080/talodu/api/register");

}

*/

    

try {
    //const response = await axios.post(API_URL, JSON.stringify({firstName, lastName, email, password}),
    const response = await axios.post(AppService.app_url("/api/user/save"), JSON.stringify(data),
    {
        headers: { 'Content-Type': 'application/json'}

    }

    );
    console.log(response?.data);
    if(response?.data.id !=0 ) {
        users.push(response?.data);
        //users.push(data);
        setUserAdded(data.email);
        
    } else {
        console.log("Le email est pris: ", response?.data.email);
    }
    
    //setSuccess(true);

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
    case "userlist": return (<UserComponent/>);
    case "adduser": return ( <AddUser/>);

    
}

if(data.length === 0 ) {
    return (
        <div>
                <h1>No data!</h1>
                
                <UserComponent/>
            </div>
    )
}

    return (
        <>

        
        { success ? (
            <div>
                <h1>Success!</h1>
                
                <UserComponent/>
            </div>
        ): 
        
        (
        <div className="parentdiv"> 

        
                        <div className="container">

                                    <div 
                                        ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg} 
                                    </div>
                                    <h1>Add user</h1>

                                    <div className="addUserForm"> 
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <label htmlFor="firstame">
                                                    First Name:
                                                </label>
                                                <input
                                            // type="text" id="username" ref={userRef} autoComplete="off"
                                                
                                                //onChange={(e) => setFirstName(e.target.value)}
                                                
                                                
                                                {...register("firstName")}
                                                //value={firstName}
                                                //required
                                                //aria-invalid={validName ? "false": "true"}
                                                //onFocus={() => setUserFocus(true)}
                                                //onBlur={() => setUserFocus(false)}
                                                />

                                                <p id="uinote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                                    4 to 24 characters. <br/>
                                                    Must begin with a letter. <br/>
                                                    Letter, numbers, underscores, hyphens allowed.
                                                </p>

                                                <label htmlFor="lastname">
                                                    Last Name:
                                                </label>

                                                <input 
                                                //onChange={(e) => setLastName(e.target.value)}
                                            // value={lastName}
                                                {...register("lastName")}
                                                />

                                                <label htmlFor="email">
                                                    Email:
                                                </label>

                                                <input 
                                                    {...register("email")}
                                                />

                                                <p>
                                                </p>

                                                <button disabled={validFirstName}>Sign Up</button>
                                            </form>
                                    </div>

                                    

                                <div>
                                    <h6>Already a member? <span onClick={() => setHomePage("login")}> Sign in</span> </h6>
                                </div>

                                <h1 className="text-center">List of users</h1>

                                <span 
                                    onClick={(e)=>{ handleDeleteUsers(e, selectedUsers); }}>Delete users {nUsersToDelete}
                                </span>


                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>User Id</td>
                                            <td>User First name</td>
                                            <td>User last Name</td>
                                            <td>User email</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        
                                            data.length?[...data].reverse().map(user => <tr key = {user.email}>
                                                <td>{user.id}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                                <td><input type="checkbox" id={user.id} onChange={(e)=>{
                                                    
                                                    //setSelectedUser(e.target.id);

                                                    handleSelectedUser(e.target.id, e.target.checked);
                                                    //console.log(e.target.id);
                                                    setSelectedId(e.target.id);
                                                    setBoxChecked(e.target.checked);
                                                    //setUserAdded("yes");
                                                    }}/></td>
                                            </tr>) : console.log("No data")
                                        }
                                        </tbody>
                                    </table>


                                    </div>
                     
                        </div>
    )}
    </>
    )
}



export default AddUser;