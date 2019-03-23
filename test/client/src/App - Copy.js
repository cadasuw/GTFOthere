import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';

class App extends Component {
  componentDidMount () {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  handleClick(e) {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    // Sign-up an account to get one
    window.OAuth.initialize('cBYfGvYIdLVaQ7tpiB_wNdACurc');

    // Popup Github and ask for authorization
    window.OAuth.popup('google').then((provider) => {

      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        console.log("data: ", data);
        alert("Welcome " + data.name + "!");
      });

      // You can also call Github's API using .get()
      provider.get('/user').then((data) => {
         console.log('self data:', data);
      });

    });
  }

  render() {
    return <a href="" onClick={this.handleClick.bind(this)} className="btn btn-social btn-google">
             <span className="fa fa-google"></span> Sign in with Google
           </a>;
  }
}

export default App;
 
