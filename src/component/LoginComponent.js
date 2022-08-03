import React from "react";
import HomeComponent from "./HomeComponent";


class LoginComponent extends React.Component

{

    render ( ) {

        const nextURL = 'http://localhost:3000/login';
        const prevURL = 'http://localhost:3000';
        const nextTitle = 'My new page title';
        const nextState = { additionalInformation: 'Updated the URL with JS' };
       // window.history.replaceState(nextState, nextTitle, prevURL)
        //window.history.pushState(nextState, nextTitle, nextURL);


        return (

            <div>

            
                <h1>Login here</h1>
                <form>
                <label htmlFor="email">
                    Email:
                </label>
                <input type="text" placeholder="email"/>
                <p>

                </p>

                <label htmlFor="password">
                    Password:
                </label>
                <input type="password" placeholder="password" />

                <p>

                </p>

                <button>Login</button>

                </form>
                
            </div>
        );
    }
}

export default LoginComponent