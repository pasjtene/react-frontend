import { useEffect, useState } from "react";
import { useUser, useUserUpdate } from "./UserContext";
import UserService from "../../services/UserService";

const USER_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%/:,."']).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserInfo = ()  => {
    const user = useUser();
    const updateUser = useUserUpdate();

    const [selectedRole, setSelectedRole] = useState('');
    
    const [selectedId, setSelectedId] = useState("");
    const [boxChecked, setBoxChecked] = useState(false);
    const [userAndRoles, setUserAndRoles] = useState({});

    const [dob, setUserDob] = useState(user.dob);
    const [email, setUserEmail] = useState(user.email);
    const [firstName, setUserFirstName] = useState(user.firstName);
    const [lastName, setUserLastName] = useState(user.lastName);
    const [nChecked, setNchecked] = useState(0);
    const [fnChecked, setFnchecked] = useState(0);
    const [lnChecked, setLnchecked] = useState(0);
    const [emailChecked, setLEmailchecked] = useState(0);
    const [dobChecked, setLDobchecked] = useState(0);

    const [errMsg, seterrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect( () => {
    
        
        setSelectedId(selectedId);
        setBoxChecked(boxChecked);
        setSelectedRole(selectedId+boxChecked);
        //console.log("The selected users: ", selectedUsers);
    }, [], selectedRole)
    
   

    useEffect(()=>{
        console.log("The user with updated roles: ", userAndRoles);
        console.log("The user with updated roles: ", user);

    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const v1 = USER_REGEX.test(user);
        const v1 = USER_REGEX.test(firstName);
        const v2 = USER_REGEX.test(lastName);
        
        if(!v1 || !v2) {
            if(!v1) {
                console.log("invalid first name");
            }

            if(!v2) {
                console.log("invalid last name");
            }
         seterrMsg("Invalid Entry");
         console.log(JSON.stringify({firstName, lastName, email, dob}))

        // const [userDob, setUserDob] = useState(user.dob);
        // const [userEmail, setUserEmail] = useState(user.email);
        // const [userFirstName, setUserFirstName] = useState(user.firstName);
        // const [userLastName, setUserLastName] = useState(user.lastName);


         return;
        }
        
        
        try {
            //const response = await axios.post(api_url, JSON.stringify({firstName, lastName, email, password}),
            const response = await UserService.updateUser(JSON.stringify({firstName, lastName, email, dob})
        
            );
        
            
            console.log(response?.data);
            response?updateUser(response.data):console.log("Update faile ..No response");
            
            setSuccess(true);
            //return;
        
        } catch (err) {
            console.log(err);
            console.log("Status code...",err.response.data);
            console.log("Status code...",err.response.status);
            if(err.response.status === 409) {
                //setRegisterError("The user already exist. Please check email: " + err.response.data.email);
            }
            
        }
        
        }



const handleDobChange = (id, target) => {
    
    setUserDob(target);  
}

const handleEmailChange = (id, target) => {
    
    setUserEmail(target); 
}

const handleFirstNameChange = (id, target) => {
    
    setUserFirstName(target);
    
}

function handleFirstNameChecked(e, checked) {
    //const [fnChecked, setFnchecked] = useState(0);
    if(checked) {
        setFnchecked(fnChecked+1)
    } else {
        setFnchecked(fnChecked-1)
    }
   
}

function handleLastNameChecked(e, checked) {
    //const [lnChecked, setLnchecked] = useState(0);
    if(checked) {
        setLnchecked(lnChecked+1)
    } else {
        setLnchecked(lnChecked-1)
    }
    
}

function handleEmailChecked(e, checked) {
    //const [lnChecked, setLnchecked] = useState(0);
    if(checked) {
        setLEmailchecked(1)
    } else {
        setLEmailchecked(0)
    }
    
}

function handleDobChecked(e, checked) {
    //const [lnChecked, setLnchecked] = useState(0);
    if(checked) {
        setLDobchecked(1)
    } else {
        setLDobchecked(0)
    }
    
}


function updateChecked (checked) {
    if(checked) {
        setNchecked(nChecked+1)
    } else {
        setNchecked(nChecked-1)
    }

    console.log(nChecked);
}

const handleLastNameChange = (id, target) => {
    console.log("The target is: ", target);
    setUserLastName(target);
    console.log("The id is: ", id);
}

    return (


        <div className="content1">

            <div>
                <h5> Personal details for {user.firstName} {user.lastName}  </h5>
            </div>
                        
            <div> 

                <div> 
                    <input type="checkbox"
                            id={user.firstName}
                            onChange={(e)=>{handleFirstNameChecked(e.target.id, e.target.checked);updateChecked (e.target.checked)}}
                            />
                            First name: {!fnChecked?<span>{user.firstName}</span>:""}  

                            {fnChecked?
                                <input type="text" value={firstName}
                                id={user.firstName}
                                onChange={(e)=>{handleFirstNameChange(e.target.id, e.target.value)} }
                                />:""
                            }  

                </div>

                <div> 
                    <input type="checkbox"
                            id={user.lastName}
                            onChange={(e)=>{
                                handleLastNameChecked(e.target.id, e.target.checked);
                                updateChecked (e.target.checked)
                            }}
                            />
                            Last name: {!lnChecked?<span>{user.lastName}</span>:""}

                            {lnChecked?
                             <input type="text" value={lastName}
                             id={user.lastName}
                             onChange={(e)=>{handleLastNameChange(e.target.id, e.target.value)}}
                             /> :""

                            }

                            
                </div>
                
                

                <div> 
                    <input type="checkbox"
                            id={user.dob.slice(0,4)}
                            onChange={(e)=>{
                                handleDobChecked(e.target.id, e.target.checked);
                                updateChecked (e.target.checked)
                            }}
                            />
                            Birth date: {!dobChecked?<span>{user.dob}</span>:""}
                            
                            {dobChecked?

                                <input type="date" value={dob}
                                id={user.dob.slice(0,4)}
                                onChange={(e)=>{handleDobChange(e.target.id, e.target.value)}}
                                />:""
                                }
                           
                </div>
                </div> 
                                                    
              {nChecked? 
              <span className="remove-roles" onClick={(e)=>{handleSubmit(e) }}>Update details</span>:""
              }                                  
        

            <div>
                <h5> Available roles </h5>
            </div>
           
        </div>
    )


}

export default UserInfo