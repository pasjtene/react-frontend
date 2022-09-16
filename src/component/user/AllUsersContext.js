import React, { useContext, useState } from "react";
//import Cookies from 'js-cookie';

const UsersContext = React.createContext({
    users:[]
  });

  const UsersContextUpdate = React.createContext({
    users:[]
  });

  export function useUsers() {
    return useContext(UsersContext)
  }

  export function useUserUpdate() {
    return useContext(UsersContextUpdate)
  }

  export function UsersProvider({children}) {
    const [users, setUsers] = useState([])


    function updateUsers(us) {
        if(us) {

            setUsers(us);
            console.log("Updating user with...",us);

        } 
        
    }


    return (
        <UsersContext.Provider value={users}>
            <UsersContextUpdate.Provider value={updateUsers}>
                {children}
            </UsersContextUpdate.Provider>
        </UsersContext.Provider>
    )
  }