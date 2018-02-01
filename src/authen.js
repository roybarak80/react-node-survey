import {
    ToastContainer,
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

    addAlert(title, msg) {
        container.success(
            title,
            msg, {
                showAnimation: 'bounceIn',

                timeOut: 1000,
                extendedTimeOut: 1000
            });

    }
    addError() {
        container.error(
            title,
            msg, {
                showAnimation: 'bounceIn',

                timeOut: 1000,
                extendedTimeOut: 1000
            });

    }
    login(event) {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.then(user => {
            // this.addAlert(this.state.foo,null);
            var lout = document.getElementById('signup');
            lout.classList.add('hide');
            var lout = document.getElementById('logout');
            lout.classList.remove('hide');
            this.addAlert(`wellcome ${user.displayName}`, null);
            console.log(user);
        });
        promise.catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({ err: err, foo: foo });

        });


    }

    signUp(event) {
        const firstname = this.refs.firstname.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);
        var err;

        promise.then(user => {

            this.addAlert(this.refs.firstname.value, null);

            firebase.database().ref('user/' + user.uid).set({
                email: user.email,

            });
            // firebase.database().ref('user/' + user.uid).child("alanisawesome").set({
            //     date: new Date(),
            //     full_name: "Alan Turing"
            //   });
              
            user.updateProfile({
                displayName: this.refs.firstname.value,
                photoURL:'dsdssd'
            }).then(function () {
                console.log('// Update successful.');


            }, function (error) {
                console.log(' Update successful.');

            });


            console.log(user);
            this.setState({ err: err });

        });
        promise.catch(e => {
            var err = e.message;
            console.log(err);
            this.setState(({ err: err }))

        });

    }
    logOut() {
        const current_user = firebase.auth().currentUser;
        this.addAlert(`Goodbye  ${current_user.displayName}`, null);
        
       firebase.auth().signOut();
       var lout = document.getElementById('logout');
            lout.classList.add('hide');
            var sout = document.getElementById('signup');
            sout.classList.remove('hide');

    }
    logInGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup(provider);
        promise.then(result => {
            var user = result.user;
            console.log(user);
            firebase.database().ref('users/'+user.uid).set({
                email:user.email,
                name:user.displayName
            });            
        });
        promise.catch(e=>{
            var msg = e.message;
            console.log(msg);
            
        })
        
    }

    deleteCurrentUser(){
        firebase.auth().currentUser.delete().then(function () {
            console.log('delete successful?')
            console.log(firebase.auth().currentUser)
        }).catch(function (error) {
            console.error({ error })
        })
    }
    constructor(prop) {
        super(prop);
        this.state = {
            err: '',
            firstname: ''

        }
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.addAlert = this.addAlert.bind(this);
        this.addError = this.addError.bind(this);
        this.logOut = this.logOut.bind(this);
        this.logInGoogle = this.logInGoogle.bind(this);
        
    }
    render() {
        return (
            <div className="container">
                <ToastContainer
                    ref={ref => container = ref}
                    className="toast-top-center"
                />
                <div className="row vertical-offset-100">
                    <div className="col-md-4 col-md-offset-4 login-wrap">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please sign in</h3>
                            </div>
                            <div className="panel-body">
                             
                                        <div className="form-group">
                                            <input id="firstName" name="firstName" type="text" placeholder="First Name" ref="firstname" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <input id="email" className="form-control" placeholder="E-mail" ref="email" name="email" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <input id="pass" className="form-control" placeholder="Password" ref="password" name="password" type="password"  />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox" value="Remember Me" /> Remember Me
                         </label>
                                        </div>
                                        <div className="btn-div">
                                            <button className="btn btn-success" onClick={this.login}>Login</button>
                                            <button className="btn btn-success" id="google" onClick={this.logInGoogle}>Log in with Google</button>
                                            <button className="btn btn-success" id="signup" onClick={this.signUp}>Signup</button>
                                            <button className="btn btn-success hide" id="logout" onClick={this.logOut}>LogOut</button>
                                        </div>
                              
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Authen;