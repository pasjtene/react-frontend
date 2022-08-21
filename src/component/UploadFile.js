
import React, { Component, useEffect, useState} from "react";
import axios from "axios";
import { matchPath } from "react-router-dom";
import UserService from "../services/UserService";
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
                progress: 0
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

    fileUploadHandler = async (ev) => {
        const fd = new FormData();
        fd.append("File", this.state.selectedfile, this.state.selectedfile.name);
        //fd.append("File", selectedFile, selectedFile.name);

        console.log("The fd is..",fd);
        //UserService.uploadFile(fd).then(res => {
          //  console.log(res);
        //});



       
        const instance = axios.create({
            withCredentials: true
          });

        if(mylocation === "http://localhost:3000") {

            axios.post(LOCAL_FILE_UPLOAD_URL, fd, {
                onUploadProgress: e => {
                    console.log("loaded progress " +  Math.round ((e.loaded / e.total)*100) + "%");
                    //this.setState({progress: Math.round ((e.loaded / e.total)*100) });
                    this.updateProgress(Math.round ((e.loaded / e.total)*100));
                    //setProgress(Math.round ((e.loaded / e.total)*100));
                }
            }
            );
            

        } else {

            try { 


                
            
               const resp = await   axios.post(FILE_UPLOAD_URL, fd, {
                onUploadProgress: e => {
                    console.log("loaded progress " +  Math.round ((e.loaded / e.total)*100) + "%")
                    //this.setState({progress: Math.round ((e.loaded / e.total)*100) });
                    this.updateProgress(Math.round ((e.loaded / e.total)*100));
                    //setProgress(Math.round ((e.loaded / e.total)*100));
                }
            }
            ,
                { headers: {  Authorization: true}, withCredentials: true },);

            console.log("The response..");
            console.log(resp);


            } catch (err) {

                console.log("File upload failled ");
                console.log(err);

            }

            

        }




    }

   
render () {

    return (
        <div style={{display: "flex", flexDirection:"column"}}>

            <h3>Upload progress: {this.state.progress} %</h3> 

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