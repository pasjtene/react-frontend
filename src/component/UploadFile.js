
import React, { Component, useEffect, useState} from "react";
import axios from "axios";
import { matchPath } from "react-router-dom";
import UserService from "../services/UserService";
import Cookies from 'js-cookie';



const user = Cookies.get("user");
if(user) {
    const authUser = JSON.parse(Cookies.get("user"));
}
//const authUser = JSON.parse(Cookies.get("user"));
const mylocation = window.location.origin;

const LOCAL_FILE_UPLOAD_URL = "http://localhost:8086/api/uploadfile";
const FILE_UPLOAD_URL = "http://51.68.196.188:8080/talodu/api/uploadfile";

axios.defaults.withCredentials = true;

class uploadFile extends React.Component {
   // const uploadFile = () => {

        //const [selectedFile, setFile] = useState(null);
        //const [progress, setProgress] = useState(0);


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

       

    
    updateProgress(c) {
        // Note: this will *not* work as intended.
        this.setState({progress: c});
      }

    fileSelectedHandler = e => {
        console.log(e.target.files[0]);
        //setFile(e.target.files[0]);
        this.setState({selectedfile: e.target.files[0]})
            
         
    }

    posts = {
        user1: {profileImagePath: "jt1"}
    }

    fileUploadHandler = async (ev) => {
        const fd = new FormData();
        fd.append("File", this.state.selectedfile, this.state.selectedfile.name);
        fd.append("Email", JSON.parse(Cookies.get("user")).email);
        //fd.append("File", selectedFile, selectedFile.name);

        console.log("The fd is..",fd);

 /*


        try {
                const response = await UserService.uploadFile(fd).then(res => {
                    console.log(response);
                });

        } catch (err) {

            console.log(err);


        }


       

*/

        //const instance = axios.create({withCredentials: true});
            
          

          console.log("The current location is..",mylocation );

        if(mylocation === "http://localhost:3000") {

            //axios.post(LOCAL_FILE_UPLOAD_URL, fd, {

                try { 
                    const resp = await axios.post(LOCAL_FILE_UPLOAD_URL, fd, {

                onUploadProgress: e => {
                    console.log("loaded progress " +  Math.round ((e.loaded / e.total)*100) + "%");
                    //this.setState({progress: Math.round ((e.loaded / e.total)*100) });
                    this.updateProgress(Math.round ((e.loaded / e.total)*100));
                    //setProgress(Math.round ((e.loaded / e.total)*100));
                }
            }
            );


            console.log("The response..");
            console.log(resp?.status);

                if (resp.status === 201)  {

                    console.log(resp.data.profileImagePath);

                this.setState({result: "File uploaded successfully"});
                //this.setState({profileImagePath: resp.data.profileImagePath });
                this.setState({profileImagePath:  "../img/Photo-ID-2.jpg" });

                const jm = [];
                jm.push(resp.data.profileImagePath);
                this.setState({jimage:  [...this.state.jimage, resp.data.profileImagePath] });
               

                }

                if (resp.status === 505)  {

                    this.setState({result: "File uploaded Failed. The file is too big"});
    
                    }

            

        } catch (err) {

            console.log("File upload failled ");
            console.log(err.response.status);

            if(err.response.status === 505) {
                this.setState({result: "Upload failed. The file is too big."});
            }

        }

            

        } else {

        
            try { 
                const resp = await     axios.post(FILE_UPLOAD_URL, fd, {
                    onUploadProgress: e => {
                        console.log("loaded progress " +  Math.round ((e.loaded / e.total)*100) + "%")
                        //this.setState({progress: Math.round ((e.loaded / e.total)*100) });
                        this.updateProgress(Math.round ((e.loaded / e.total)*100));
                        //setProgress(Math.round ((e.loaded / e.total)*100));
                    }
                }

            );

            console.log("The response..");
            console.log(resp?.status);
            this.setState({result: resp?.status});

                //const jm = [];
                //jm.push(resp.data.profileImagePath);
                this.setState({jimage:  [...this.state.jimage, resp.data.profileImagePath] });





            } catch (err) {

                console.log("File upload failled ");
                console.log(err);

            }

        }


    }

   
render () {

    return (
        <div style={{display: "flex", flexDirection:"column"}}>

            <h3>Upload progress: {this.state.progress} % </h3> 
            <div>
            <h5>{this.state.result}</h5> 
            </div>

            <div>
            <h5> Profile image:
               
            
            </h5> 

                <div>
      {/* looping through all the post that were retrieve from an API */}
      { 
       
       this.state.jimage.map(post => {
        console.log("the jimage..");
        console.log(this.state.jimage);
        // here we are dynamically creating a path to the image
        // require() returns a string to the path of the image

      //  const image = require('../img/' + post);


        //const image = require("./"+post);
        {console.log("The publich path..", process.env.PUBLIC_URL)} 

        return (
          // we put the image variable we made earlier into the src attribute
         // <img key={ post.id } src={ image } alt={ post.character } />


          //<img src={ image }  />;
          //<img src={process.env.PUBLIC_URL + '/img/logo.png'} />
          //<img src={process.env.PUBLIC_URL + '../img/'+ post} />
          <img src={FILE_UPLOAD_URL +"/images/"+ post} />
        


        );
      }) }
    </div>


                      
                <img src= {  require("../img/Photo-ID-2.jpg")} />
            </div>

            

            <input style={{display: "none"}} 
            type="file" 
            onChange={this.fileSelectedHandler}
            ref={fileInput => this.fileInput = fileInput}/>
            <button onClick={()=> this.fileInput.click()}>chose a file</button>
            <button onClick={this.fileUploadHandler}>Upload</button>

            


        </div>
    )

}
}

export default uploadFile