import { ToastContainer,
    ToastMessage,
  } from "react-toastr";
import React, { Component } from 'react';
//import Usurvey from './Usurvey';

var firebase = require('firebase');
var uuid = require('uuid');
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
let container;
let title;
let msg;
var foo;

var config = {
    apiKey: "AIzaSyBVKOGE45_EKg3rWxieMazx2jf5CgRzfL0",
    authDomain: "usurvey-d9853.firebaseapp.com",
    databaseURL: "https://usurvey-d9853.firebaseio.com",
    projectId: "usurvey-d9853",
    storageBucket: "usurvey-d9853.appspot.com",
    messagingSenderId: "337172513642"
  };
  firebase.initializeApp(config);

class Authen extends Component {

    addAlert (title,msg) {
        container.success(
            title,
          msg, {
            showAnimation:'bounceIn',
           
          timeOut: 1000,
          extendedTimeOut: 1000
        });
        
      }
      addError () {
        container.error(
          title,
          msg, {
            showAnimation:'bounceIn',
            
          timeOut: 1000,
          extendedTimeOut: 1000
        });
        
      }
    login(event){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.then(user=>{
            this.addAlert(this.state.foo,null);
var lout = document.getElementById('logout');
        lout.classList.remove('hide');
        });
        promise.catch(e => {
var err = e.message;
console.log(err);
this.setState({err:err,foo:foo});

        });
        

    }

    signUp(){
        const firstname = this.refs.firstname.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email,password);
        promise.then( user =>{
            
            var err = "Welcome "+ user.email;
            firebase.database().ref('user/'+user.uid).child(user.uid).set({
                email:user.email,
                userId: user.uid
                
            });
           

            console.log(user);
            this.setState({err:err});
            
        });
        promise.catch(e=>{
var err = e.message;
console.log(err);
this.setState(({err:err}))

        });
        
    }
    logOut (title,msg) {

    }
    constructor(prop){
    super(prop);
    this.state ={
        err: ''
        
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.addAlert = this.addAlert.bind(this);
    this.addError = this.addError.bind(this);
    }
    render() {
        return (
            <div className="container">
                <ToastContainer
    ref={ref => container = ref}
    className="toast-top-right"
  />
                <input id="firstName" type="text" placeholder="First Name" ref="firstname"/><br/>
                <input id="email" type="email" placeholder="email" ref="email"/><br/>
                <input id="pass" type="password" placeholder="password" ref="password"/><br/>
                <p>{this.state.err}</p>
<button onClick={this.login}>Login</button>
<button onClick={this.signUp}>SighUP</button>
<button id="logout" className="hide" onClick={this.logOut}>LogOut</button>

            </div>
        );
    }
}

export default Authen;