import React, { Component } from 'react';
import API from "./utils/API";
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import './css/style.css';
import Search from "./components/search.js";

const googleClientId = "1065744720974-rum7je588fcif793pqvn4b69uov84mid.apps.googleusercontent.com"

class App extends Component {

	state = {
		id_token: "",
	};

	getToken = idToken => {
		API.getToken(idToken)
			.then(res => {
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
		this.setState({ id_token: "" })
	}

	render() {
		return (
			<div className={"App"}>


				<div className="navbar">
					<ul>
						<li className="home"><a href="#">Home</a></li>
						<li className="signup">
							<a href="#" data-toggle="modal" data-target="#modal">Sign up</a>
						</li>
						<li className="btnGoogle">
							<GoogleLogin
								clientId={googleClientId}
								//		buttonText="Sign In"
								render={renderProps => (
									<button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in</button>
								)}
								onSuccess={this.responseGoogle}
								onFailure={this.responseGoogle}
							>
							</GoogleLogin>
						</li>
						<li className="Explore"><a href="#">Explore</a><ul>
							<li><a href="#">About</a></li>
							<li><a href="#">Profile</a></li>
							<li><a href="#">Sign Out</a></li></ul>
						</li>
					</ul></div>

				<div className={"container-fluid"}>
					<div className={"row"}>
						{/* TOP BANNER */}
						<div className={"top-banner"}>
							<div className={"top-banner-header"}>
								<div className={"inner"}>
									<header id={"header-container"} className={"middle"}>
										<h2 className={"orange big text-center"}>GTFO</h2>
									</header>
									{/*<p className={"air-up"}>
										<button id={"button1-container"} className={"button1 button-primary-orange-hollow"}>
											<input className={"button"} placeholder={"Get The Feet Out!"} />
											
										</button>
								</p>*/}
										<Search></Search>
								</div>
							</div>

						</div>
					</div>

				</div>

				{/* BEGIN MODAL */}
				<aside id={"modal"} className={"modal fade"}>
					<div className={"modal-dialog"} role={"document"}>
						<div className={"modal-content"}>
							<div className={"modal-header"}>
								<div className={"modal-header-gradient"}></div>
								<div className={"row"}>
									<h2 className={"black text-center"}>Sign up</h2>
									{/* <p data-modal-id className={"text-center white"}></p> */}
								</div>
								<div className={"thin-line"}></div>
							</div>
							<div className={"modal-body"}>
								<div className={"row"}>
									<div className={"col-md-10 col-md-offset-1 col-sm-12"}>
										{/* <form id={"modal-form"}> */}
										<div className={"form-group"}>
											<div className={"input-group"}>
												<span className={"input-group-addon"}><i className={"fa fa-user"}></i></span>
												<input type={"text"} className={"form-control form-control-sibling"} placeholder={"First name"} />
												<input type={"text"} className={"form-control form-control-sibling"} placeholder={"Last name"} />
											</div>
										</div>
										<div className={"form-group"}>
											<div className={"input-group"}>
												<span className={"input-group-addon"}><i className={"fa fa-envelope"}></i></span>
												<input type={"email"} className={"form-control"} placeholder={"E-mail"} />
											</div>
										</div>
										<div className={"form-group"}>
											<div className={"input-group"}>
												<span className={"input-group-addon"}><i className={"fa fa-lock"}></i></span>
												<input type={"password"} className={"form-control"} placeholder={"Password"} />
												<input type={"password"} className={"form-control form-control-sibling"} placeholder={"Repeat password"} />
											</div>
										</div>
										<p>
											<button type={"submit"} className={"button button-primary-orange"} id={"sign-me-up"}>Sign up</button>
										</p>

										<p>
											<button type={"reset"} className={"button button-primary-blue"} data-dismiss={"modal"} id={"cancel"}>Cancel</button>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>

		);



	}
}

export default App;
