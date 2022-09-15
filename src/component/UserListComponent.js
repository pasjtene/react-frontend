          
        <div className="container">
        <div className="parentdiv"> 

                    <div className="firstNav">
                        <h6>
                            <span className="homeLinks" onClick={()=>setHomePage("userlist")}> list of courses </span>
                            <span className="homeLinks" onClick={()=> setHomePage("register")}>Register</span>
                            <span className="homeLinks" onClick={()=> setHomePage("adduser")}> Add user</span>
                        </h6>
                        <span className="homeLinks" onClick={()=> setHomePage("login")}> logout</span>
                    <div>
                        

                    <div>
                        Welcome  {props.firstName} {props.lastName}
                        
                        </div>

                        <div>
                        Welcome2  {props.firstName} {props.lastName}
                        
                        </div>

                        
                        <div>
                        Welcome from cookie  {userFN} 
                        
                        </div>

                        <div>
                        Welcome again {props.user.firstName} {props.user.lastName} {props.user.profileImagePath} 
                        
                        </div>

                        <div>
                        Your roles are {props.user.roles.map(role=>role.name+", ")} 
                        </div>
                

                to the react and spring boot full stack secure app training ... We are logged in
        </div>
</div>
</div>

</div>