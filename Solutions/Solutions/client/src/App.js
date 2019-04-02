import React, { Component } from 'react';
import API from "./utils/API";
//import './App.css';

import {GoogleLogin} from 'react-google-login';
import {GoogleLogout} from 'react-google-login';

class App extends Component {
  state = {
   id_token: ""
 };

  getToken = idToken => {

    API.getToken(idToken)
      .then(res => {
        console.log("app.js res.data: ", res.data);
        localStorage.setItem("JWT_TOKEN", JSON.stringify(res.data));
      })
      .catch(err => console.log(err))
  };
  
  responseGoogle = (response) => {
    console.log("responseGoogle", response);
    console.log("id_token:", response.tokenObj.id_token)
    console.log("name:", response.profileObj.givenName)
    let idToken = response.tokenObj.id_token;
    this.setState({
      id_token: response.tokenObj.id_token
    });
    this.getToken(idToken);
  } 
    
  
  logout = (response) => {
    console.log("logged out");
    localStorage.removeItem("JWT_TOKEN");
    this.setState({id_token: ""})

  }

  render() {


    return (
      <div className="App">
        <h1>LOGIN WITH GOOGLE</h1>


      <GoogleLogin
//      { !this.props.isAuth ? [] : null}
        clientId="1065744720974-rum7je588fcif793pqvn4b69uov84mid.apps.googleusercontent.com" //CLIENTID 
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}                                                                                                                                                                                                                     
//      className="btn btn-outline-danger" (if want to change styling)      
      />

      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={this.logout}
      >
      </GoogleLogout>

      </div>
    );
  }
}

export default App;
 
