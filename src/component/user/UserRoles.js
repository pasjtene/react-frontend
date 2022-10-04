import { useEffect, useState } from "react";
import { useUser, useUserUpdate } from "./UserContext";
import UserService from "../../services/UserService";

const UserRoles = ()  => {
    const user = useUser();
    const updateUser = useUserUpdate();

    const [roles, setRoles] = useState([])
    const [responseStatus, setResponseStatus] = useState(0);
    const [userRoleChecked, setUserRoleChecked] = useState(0);
    const [AddUserRoleChecked, setAddUserRoleChecked] = useState(0);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedRolesToRemove, setSelectedRolesToRemove] = useState([]);

    const [nRolesToAdd, setNrolesToAdd] = useState(0);
    const [nRolesToRemove, setNrolesToRemove] = useState(0);
    const [selectedId, setSelectedId] = useState("");
    const [boxChecked, setBoxChecked] = useState(false);
    const [userAndRoles, setUserAndRoles] = useState({});

    useEffect( () => {
    
        //selectedUsers.push(selectedUser);
        setSelectedRoles([]);
        setSelectedRolesToRemove([]);
        
        setSelectedId(selectedId);
        setBoxChecked(boxChecked);
        setSelectedRole(selectedId+boxChecked);
        //console.log("The selected users: ", selectedUsers);
    }, [], selectedRole)
    
    useEffect(()=>{
        console.log("The number of roles to add: ", nRolesToAdd);
        setUserAndRoles(user);

    },[nRolesToAdd])

    useEffect(()=>{
        console.log("The user with updated roles: ", userAndRoles);
        console.log("The user with updated roles: ", user);

    },[user])

    useEffect(()=>{
        console.log("The user with updated roles: ", userAndRoles);
        //console.log("The user with updated roles: ", user);

    },[userAndRoles])

    useEffect (()=> {
        //setUserAndRoles(user);
        UserService.getRoles().then((response) => {
            setRoles(response.data);
            console.log("The response status: ", response.status);
            console.log("The response data: ", response.data);
        }).catch((error)=>{
            //console.log("Error getting users...",e)
            if (error.response) {
                setResponseStatus(error.response.status);
                
                console.log("Error getting users...status..", error.response.status);
                //console.log("Error getting users...headers...", error.response.headers);
                console.log("Error getting users...data...", error.response.data);
              }
        });
    },[], selectedRole)
    

    const handleSelectedRole = (id, roleSelected) => {
        
        var array = [...selectedRoles];
            const index = array.indexOf(id);
    
        if(roleSelected) {
            setSelectedRole(id+roleSelected);
            selectedRoles.push(id);
    
            setNrolesToAdd(selectedRoles.length);
            //setNrolesToRemove(0);
            
        } else {
            setSelectedRole(id+roleSelected);
            //console.log("The user is NOT selected");
            if (index > -1) { // only splice array when item is found
               array.splice(index, 1); // 2nd parameter means remove one item only
                setSelectedRoles(array);
                setSelectedRole(id+roleSelected);
                setNrolesToAdd(array.length);
                //setNrolesToRemove(0);
                console.log(Object.assign({}, array));
                
            }
    
        }
        
    }


    const handleRemoveSelectedRole = (id, roleSelected) => {
        
        var array = [...selectedRolesToRemove];
            const index = array.indexOf(id);
    
        if(roleSelected) {
            setSelectedRole(id+roleSelected);
        
            selectedRolesToRemove.push(id);
    
            setNrolesToRemove(selectedRolesToRemove.length);
            console.log("The roles to remove..",selectedRolesToRemove);
            //setNrolesToAdd(0);
            
        } else {
            setSelectedRole(id+roleSelected);
            //console.log("The user is NOT selected");
            if (index > -1) { // only splice array when item is found
               array.splice(index, 1); // 2nd parameter means remove one item only
               setSelectedRolesToRemove(array);
                setSelectedRole(id+roleSelected);
         
                setNrolesToRemove(array.length);
            
                console.log("The roles to remove..",selectedRolesToRemove);
                
            }
    
        }
        
    }
    


const addUserRoles = () => {
    selectedRoles.push(user.id);

    UserService.addRolesToUser(selectedRoles)
                .then(response => {
                    console.log(response.data);

                    if(response.data) {
                        if(response.data.id && response.data.email) {
                            console.log("We have a valid user")
                            updateUser(response.data);
                            setUserAndRoles(response.data)

                        } else {
                            console.log("We have a invalid data")
                            console.log(response.data)
                        }
                    } else {
                        console.log("We no response data")
                    }
                    setSelectedRoles([]);
                    setNrolesToAdd(0);
                  
                })
                .catch(err => {
                    console.log(err)
                    setSelectedRoles([]);
                    setNrolesToAdd(0);
                 
                })
}


const removeUserRoles = () => {
    selectedRolesToRemove.push(user.id);

    UserService.removeUserRoles(selectedRolesToRemove)
                .then(response => {
                    console.log(response.data);

                    if(response.data) {
                        if(response.data.id && response.data.email) {
                            console.log("We have a valid user")
                            updateUser(response.data);
                            setUserAndRoles(response.data)

                        } else {
                            console.log("We have a invalid data")
                            console.log(response.data)
                        }
                    } else {
                        console.log("We no response data")
                    }
                    setSelectedRolesToRemove([]);
                    //setNrolesToAdd(0);
                    setNrolesToRemove(0);
                  
                    
                })
                .catch(err => {
                    console.log(err)
                    setSelectedRolesToRemove([]);
                    //setNrolesToAdd(0);
                    setNrolesToRemove(0);
                })
}



const handleAddUserRoleChecked = (checked) => {
    console.log("The user role checked is", checked)
    setNrolesToRemove(0)
    if(checked) {

        setNrolesToAdd(nRolesToAdd+1)
        //setAddUserRoleChecked(AddUserRoleChecked+1)
    } else {
        setNrolesToAdd(nRolesToAdd-1)
        //setAddUserRoleChecked(AddUserRoleChecked-1)
    }
} 

const handleRemoveUserRoleChecked = (checked) => {
    console.log("The user role checked is", checked)
    setNrolesToAdd(0)
    if(checked) {
        

        setNrolesToRemove(nRolesToRemove+1)
    } else {
        setNrolesToRemove(nRolesToRemove-1)
    }
} 


    return (


        <div className="content1">

            <div>
                <h5> User Roles for {user.firstName} {user.lastName}  </h5>
            </div>
                        
            <div>{userAndRoles.roles? userAndRoles.roles.map(role=> <div>{role.name}  <input type="checkbox" id={role.id} onChange={(e)=>{
                                                    
                                                    handleRemoveSelectedRole(e.target.id, e.target.checked) 
                                                    
                                                    }}/>  </div>):""}</div> 
                                                    {nRolesToRemove?<span className="remove-roles" onClick={(e)=>{removeUserRoles()}}>Remove {nRolesToRemove} role{nRolesToRemove>1?"s":""}  </span>:null}

            <div>
                <h5> Available roles </h5>
            </div>
                        
            <div>{roles.length?roles.map(role=>     <div> { !UserService.hasRolev1(role.name,userAndRoles.roles)?
            <span>{role.name}
             <input type="checkbox" id={role.id} onChange={(e)=>
             {  //handleAddUserRoleChecked(e.target.checked);
                handleSelectedRole(e.target.id, e.target.checked)  }}/> 
            </span> 
            : ""
             }  
                            
                                                      </div>   ):""}
                                                    </div>

            <div>
                
                {nRolesToAdd?<span className="add-roles" onClick={(e)=>{addUserRoles()}}>Add {nRolesToAdd} role{nRolesToAdd>1?"s":""} </span>:null}
            </div>

        </div>
    )


}

export default UserRoles