import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyBVKOGE45_EKg3rWxieMazx2jf5CgRzfL0",
    authDomain: "usurvey-d9853.firebaseapp.com",
    databaseURL: "https://usurvey-d9853.firebaseio.com",
    projectId: "usurvey-d9853",
    storageBucket: "usurvey-d9853.appspot.com",
    messagingSenderId: "337172513642"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
   constructor(props){
   super(props);

   this.state = {
       uid:uuid.v1(),
       studentName: '',
       answers:{
           answer1:'',
           answer2:'',
           answer3:'',
       },
       isSubmitted:false
   };
   }

    render() {
        var studentName;
        var questions;
if(this.state.studentName === '' && this.state.isSubmitted === false){
studentName =<div> 
    <h1>Your name:</h1>
    <form>
        <input type="text" placeholder="mail" ref="name"/>
    </form>
</div>
}
        return (
            <div>
               {studentName}
               <hr/>
               {questions}
            </div>
        );
    }
}

export default Usurvey;