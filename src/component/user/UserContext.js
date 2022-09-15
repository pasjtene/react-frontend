import React, { useContext, useState } from "react";
import Cookies from 'js-cookie';

const UserContext = React.createContext({
    user:{}
  });

  const UserContextUpdate = React.createContext({
    user:{}
  });

  export function useUser() {
    return useContext(UserContext)
  }

  export function useUserUpdate() {
    return useContext(UserContextUpdate)
  }




  export function UserProvider({children}) {
    const [user, setUser] = useState({})


    function updateUser(u) {
        if(u) {

            setUser(u);
            console.log("Updating user with...",u);

        } else {

            if(Cookies.get("user")) {
            
               // const authUser = JSON.parse(Cookies.get("user"));
                //console.log("The number of users to delete: ", userFN);
               // setUser(authUser);
            //setLN(authUser.lastName);
          
            console.log("The user from userContext... component...", user.firstName);
          
            } 

        }
        

       

    }


    return (
        <UserContext.Provider value={user}>
            <UserContextUpdate.Provider value={updateUser}>
                {children}
            </UserContextUpdate.Provider>
        </UserContext.Provider>
    )
  }