import { useUser } from "./UserContext";
import UploadFile from "../UploadFile";

const UserImages = ()  => {
    const user = useUser();

    console.log("The user: ",user);

    return (


     
        <div className="content1">

            <div>
                <h5> User images for {user.firstName} {user.lastName}  </h5>
            </div>
                        
            <div>There are no images currently for {user.firstName} {user.lastName} </div>
            <UploadFile/>
          
        </div>
    )


}

export default UserImages