import React, { Component } from "react";
import GymzoImage from ".././assets/gymzo.png";
import { SERVER } from "./../config";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    let url = `${SERVER}/gymzoAPI/login`;
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJSON => {
        this.props.handleSuccessfulAuth(responseJSON);
        this.props.history.push("/");
        console.log("res from login", responseJSON);
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  checkLogin() {
    if (this.props.loggedIn) {
      console.log("checkLogin", this.props.loggedIn);
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.checkLogin();
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  redirectEdit = event => {
    this.props.history.push("/register");
  };
  render() {
    return (
      <div className="auth-wrapper login">
        <form onSubmit={this.handleSubmit} className="auth-inner">
          <img src={GymzoImage} className="image" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
          <button type="submit" onClick={this.redirectRegister}>
            Register
          </button>
        </form>
      </div>
    );
  }
}
