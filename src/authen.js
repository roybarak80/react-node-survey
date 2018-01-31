import React, { Component } from 'react';
//import Usurvey from './Usurvey';
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

class Authen extends Component {

    login(event){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.then(user=>{
var lout = document.getElementById('logout');
        lout.classList.remove('hide');
        });
        promise.catch(e => {
var err = e.message;
console.log(err);
this.setState({err:err});

        });
        

    }
    signUp(){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email,password);
        promise.then( user =>{
            var err = "Welcome "+ user.email;
            firebase.database().ref('user/'+user.uid).set({
                email:user.email
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
    constructor(prop){
    super(prop);
    this.state ={
        err: ''
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    }
    render() {
        return (
            <div>
                <input id="email" type="email" placeholder="email" ref="email"/><br/>
                <input id="pass" type="password" placeholder="password" ref="password"/><br/>
                <p>{this.state.err}</p>
<button onClick={this.login}>Login</button>
<button onClick={this.signUp}>SighUP</button>
<button id="logout" className="hide">LogOut</button>
            </div>
        );
    }
}

export default Authen;