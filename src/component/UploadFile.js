import React, { Component, useEffect, useState} from "react";
import { useRef } from "react";
import axios from "axios";
import { matchPath } from "react-router-dom";
import UserService from "../services/UserService";
import Cookies from 'js-cookie';
import { useUser } from "./user/UserContext";
import { useUserUpdate } from "./user/UserContext";
import { useNavigate } from 'react-router-dom';

/*
const user = Cookies.get("user");
if(user) {
    //const authUser = JSON.parse(Cookies.get("user"));
    console.log("The user..",user);
} else {
    console.log("User not found...")
}
*/
//const authUser = JSON.parse(Cookies.get("user"));
const mylocation = window.location.origin;

const LOCAL_FILE_UPLOAD_URL = "http://localhost:8086/api/uploadfile";
const FILE_UPLOAD_URL = "http://51.68.196.188:8080/talodu/api/uploadfile";
const IMAGE_URL = "http://51.68.196.188:8080";

axios.defaults.withCredentials = true;

//class uploadFile extends React.Component {
    const UploadFile = (props) => {

        const fileInput = useRef(null);

        const [selectedFile, setFile] = useState(null);
        const [progress, setProgress] = useState(0);
        const [result, setUploadResult] = useState(0);
        const [profileImagePath, setProfileImagePath] = useState(0);
        const [userImages, setUserImages] = useState([]);
        
        const user = useUser();
        const updateUser = useUserUpdate();
        const [updatedUser, setUpdatedUser] = useState(user);
        const navigate = useNavigate();

/** 
        constructor(props) {                
            super(props)
            this.state = {
                selectedfile: null,
                progress: 0,
                result: " ",
                profileImagePath: "",
                jimage: ["Photo-ID-2.jpg"]
            }

           
            
        }

       */


        useEffect(()=>{
            //if (userImages.length) return;
            console.log("The user to target is:...", user);
            
            //if(Cookies.get("user")) {
                //updateUser(user);
                    //setUpdatedUser(user);
                if(user.id) {
                    
                    console.log("Settinng user to ...",user);
                    updateUser(user);
                    setUpdatedUser(user);
     
                }
                //const authUser = JSON.parse(Cookies.get("user"));
               
            console.log("The target Component is ", props.user);
     
            
     
           // }
            
        },[updatedUser])

        function handleFileUploadClick(e) {
            e.preventDefault();
            fileInput.current.click();
        }

    
    const updateProgress = (c) => {
        // Note: this will *not* work as intended.
       // this.setState({progress: c});
        setProgress(c);
      }

    const fileSelectedHandler = (e) => {
        console.log("The file is...", e.target.files[0]);
        setFile(e.target.files[0]);
        //this.setState({selectedfile: e.target.files[0]})
            
         
    }

    const posts = {
        user1: {profileImagePath: "jt1"}
    }

    const fileUploadHandler = async (ev) => {
        ev.preventDefault();
        const fd = new FormData();
        fd.append("File", selectedFile, selectedFile.name);
        fd.append("Email", user.email);
        console.log("The user is...",user)
        //console.log("The user from props is...",props.user)
        //fd.append("File", this.state.selectedfile, this.state.selectedfile.name);
        //fd.append("Email", JSON.parse(Cookies.get("user")).email);
        
        

        console.log("The fd is..",fd);

 
          console.log("The current location is..",mylocation );

        if(mylocation === "http://localhost:3000") {

            //axios.post(LOCAL_FILE_UPLOAD_URL, fd, {

                try { 
                    const resp = await axios.post(LOCAL_FILE_UPLOAD_URL, fd, {

                onUploadProgress: e => {
                    console.log("loaded progress " +  Math.round ((e.loaded / e.total)*100) + "%");
                    //this.setState({progress: Math.round ((e.loaded / e.total)*100) });
                    updateProgress(Math.round ((e.loaded / e.total)*100));
                    //setProgress(Math.round ((e.loaded / e.total)*100));
                }
            }
            );


            console.log("The response..");
            console.log(resp?.status);

                if (resp.status === 201)  {

                    console.log("The response status is 201, file upload success");
                    console.log(resp.data);

                    updateUser(resp.data);
                    setUpdatedUser(resp.data);
                    
                    

                    console.log(resp.data.profileImagePath);

                //this.setState({result: "File uploaded successfully"});
                setUploadResult("File uploaded successfully")
                //this.setState({profileImagePath: resp.data.profileImagePath });
                setProfileImagePath("../img/Photo-ID-2.jpg");
                //this.setState({profileImagePath:  "../img/Photo-ID-2.jpg" });

                //const jm = [];
                userImages.push(resp.data.profileImagePath)
                console.log("The user images",);
                console.log(userImages);
                //navigate('/home');
                //jm.push(resp.data.profileImagePath);
               // this.setState({jimage:  [...this.state.jimage, resp.data.profileImagePath] });
               

                }

                if (resp.status === 505)  {

                    //this.setState({result: "File uploaded Failed. The file is too big"});
                    setUploadResult("File uploaded Failed. The file is too big")
    
                    }

            

        } catch (err) {

            console.log("File upload failled ");
            console.log(err.response.status);

            if(err.response.status === 505) {
                //this.setState({result: "Upload failed. The file is too big."});
                setUploadResult("Upload failed. The file is too big.")
            }

        }

            

        } else {

        
            try { 
                const resp = await     axios.post(FILE_UPLOAD_URL, fd, {
                    onUploadProgress: e => {
                        console.log("loaded progress " +  Math.round ((e.loaded / e.total)*100) + "%")
                        //this.setState({progress: Math.round ((e.loaded / e.total)*100) });
                        updateProgress(Math.round ((e.loaded / e.total)*100));
                        //setProgress(Math.round ((e.loaded / e.total)*100));
                    }
                }

            );

            console.log("The response..");
            console.log(resp?.status);
            //this.setState({result: resp?.status});
            setUploadResult(resp?.status);

                //const jm = [];
                //jm.push(resp.data.profileImagePath);
                //this.setState({jimage:  [...this.state.jimage, resp.data.profileImagePath] });
                userImages.push(resp.data.profileImagePath);
                updateUser(resp.data);
                setUpdatedUser(resp.data);





            } catch (err) {

                console.log("File upload failled ");
                console.log(err);

            }

        }


    }

   
//render ()
    
 //{

    return (
        <div style={{display: "flex", flexDirection:"column"}}>
          
            <input style={{display: "none"}} 
            type="file" 
            onChange={(e) => {e.preventDefault(); fileSelectedHandler(e)}}
            //ref={fileInput => this.fileInput = fileInput}
            ref={fileInput} 
            />
            <button
            //</div> onClick={()=> this.fileInput.click()}
            onClick={(e)=>{e.preventDefault(); handleFileUploadClick(e)}}
            >chose a file
             </button>

            <button onClick={(e)=>{e.preventDefault();  fileUploadHandler(e)}}>Upload</button>

            <h3>Upload progress: {progress} % </h3> 
            <div>
            <h5>{result}</h5> 
            </div>
            <div>
                <img className="imgthumbnail"  src={window.location.origin +"/images/"+ user.profileImagePath} />
                <img className="imgthumbnail"  src= {  require("../img/Photo-ID-2.jpg")} />
            </div>

            


        </div>
    )

}
//}

export default UploadFile