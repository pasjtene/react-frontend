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

axios.defaults.withCredentials = true;


//const USER_REGEX = /^[a-ZA-Z][a-zA-Z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%/:,."']).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = "/api/register";
const API_URL = "http://localhost:8085/api/register ";

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
    UserService.getUsers().then(response => {
        console.log("The response in userEffect", response.data);
        setUsers(response.data);
        setData(response.data);
    });
    //setUserAdded(true)

}, [],userAdded)


const [selectedUsers, setSelectedUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState('');
const [selectedId, setSelectedId] = useState(0);
const [boxChecked, setBoxChecked] = useState(false);
const [nUsersToDelete, setNusersToDelete] = useState(0);
const [usersCSV, setUsersCSV] = useState("");

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
        console.log("The user is selected");
        selectedUsers.push(id);

        setNusersToDelete(selectedUsers.length);
        console.log(Object.assign({}, selectedUsers));

        //console.log("The array0 : ", array);
        //array.push(id);
       // console.log("The selected users",selectedUsers);
    } else {
        setSelectedUser(id+userSected);
        //console.log("The user is NOT selected");
        
        //var array = [...selectedUsers];
        //const index = array.indexOf(id);

        //console.log("The index is: ",index);
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




const handleDeleteUsers  = async (e, selectedUsers) => {  

//const handleDeleteUsers = (selectedUsers) => {
console.log(e);
e.preventDefault(); 

const userc = Cookies.get('user-id');
setUserCookie(userc);
console.log("The user cookie..", userc);

console.log("The user cookie 2....",userCookie);

    const utodel = selectedUsers.map((e)=>e+",");

    setUsersCSV(...selectedUsers.map((e)=>e+","));


    getUsersCSV(...selectedUsers.map((userid)=>userid.trim()+","));

    axios.defaults.withCredentials = true;
    const susers = {Selusers: selectedUsers.toString()};
    setUsersToDelete(selectedUsers.toString());

    setDataToDel({users:selectedUsers.toString()});

    console.log("Valide json....");
    console.log(isValidJson(susers));

    console.log("Valide json....2");
    console.log(isValidJson(JSON.stringify(susers)));

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      };

      const DELETE_USERS_REST_API_URL = "http://localhost:8085/api/deleteusers";



      try {
        //const response = await axios.post(API_URL, JSON.stringify({firstName, lastName, email, password}),
        const response = await axios.post(DELETE_USERS_REST_API_URL,  JSON.parse(JSON.stringify(selectedUsers)) ,
          
        {
            headers: { 'Content-Type': 'application/json', 
            Authorization: userc},
            withCredentials: true
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
    

    
    




        //UserService.deleteUsersCSV(selectedUsers).then((response)=>{

        //console.log("The reponse from server: ",response);
   // });


    //remove the users from the array of users.
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


try {
    //const response = await axios.post(API_URL, JSON.stringify({firstName, lastName, email, password}),
    const response = await axios.post(API_URL, JSON.stringify(data),
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

    return (
        <>
        
        { success ? (
            <div>
                <h1>Success!</h1>
                <UserComponent/>
            </div>
        ): 
        
        (
        <div>
            <div className="firstNav">
                <h6><span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                 <span className="homeLinks" onClick={()=> setHomePage("login")}> login</span>
                 <span className="homeLinks" onClick={()=> setHomePage("adduser")}> adduser</span></h6>
                </div>
            <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg} </div>
            <h1>Add user</h1>
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

            <div>
                <h6>Already a member? <span onClick={() => setHomePage("login")}> Sign in</span> </h6>
            </div>



            <h1 className="text-center">List of users</h1>


            <span onClick={(e)=>{ handleDeleteUsers(e, selectedUsers); 
                console.log("The users to be deleted", selectedUsers, selectedUsers.toString());

                console.log("User deleted: ",userAdded);
                }}>Delete users {nUsersToDelete} </span>
                
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
                            [...data].reverse().map(user => <tr key = {user.email}>
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
                            </tr>)
                        }
                    </tbody>
                </table>


        </div>
    )}
    </>
    )
}



export default AddUser;