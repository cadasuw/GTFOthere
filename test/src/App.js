import React, { Component } from 'react';
import API from "./utils/API";
import './App.css';

import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

class App extends Component {

  getToken = idToken => {
    API.getToken(idToken)
      .then(res => {
        console.log("res: ", res)
      })
      .catch(err => console.log(err))
  };


  render() {

    const responseGoogle = (response) => {
      console.log("responseGoogle", response);
      console.log("id_token:", response.Zi.id_token)
      console.log("name:", response.profileObj.givenName)
      let idToken = response.Zi.id_token;
      this.getToken(idToken);
    } 
      
    
    const logout = (response) => {
      console.log(response);
    }

    
    

    return (
      <div className="App">
        <h1>LOGIN WITH GOOGLE</h1>


      <GoogleLogin
        clientId="1065744720974-rum7je588fcif793pqvn4b69uov84mid.apps.googleusercontent.com" //CLIENTID 
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}         
      />

      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={logout}
      >
      </GoogleLogout>

      </div>
    );
  }
}

export default App;
 
