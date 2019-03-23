import React, { Component } from 'react';
import './App.css';

import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

class App extends Component {

  render() {

    const responseGoogle = (response) => {
      console.log("responseGoogle", response);
      await this.props.oauthGoogle(response.accessToken);
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
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}         
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
 
