import React, { Component } from "react";
import GymzoImage from ".././assets/gymzo.png";
import { SERVER } from "./../config";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      dateOfBirth: "",
      sex: "",
      height: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const {
      email,
      password,
      password_confirmation,
      name,
      dateOfBirth,
      sex,
      height
    } = this.state;
    event.preventDefault();

    if (password != password_confirmation) {
      console.log("passwords don't match");
    } else {
      console.log(email, password);

      let url = `{SERVER}/gymzoAPI/createUser`;
      let settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer  token"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          dateOfBirth: dateOfBirth,
          sex: sex,
          height: height
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
          this.props.handleLogin(responseJSON.email, responseJSON.password);
          this.props.history.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="dateOfBirth"
            placeholder="dateOfBirth"
            value={this.state.dateOfBirth}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="sex"
            placeholder="sex"
            value={this.state.sex}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="height"
            placeholder="height"
            value={this.state.height}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
