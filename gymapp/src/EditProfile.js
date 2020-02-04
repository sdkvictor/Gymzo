import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import { SERVER } from "./config";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      sex: "",
      height: ""
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
    //this.renderProfile();
  }
  checkLoginStatus = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  };

  updateProfile = event => {
    event.preventDefault();
    const { name, email, password, sex, height } = this.state;
    let url = `${SERVER}/gymzoAPI/updateUser/?userId=${this.props.user.id}`;
    let settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        sex: this.state.sex,
        height: this.state.height
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
        this.handleUpdate(responseJSON);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUpdate(response) {
    console.log(response);
    this.props.history.push("/profile");
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toRoutines = () => {
    this.props.history.push("/routines");
  };

  toDashboard = () => {
    this.props.history.push("/dashboard");
  };

  toProfile = () => {
    this.props.history.push("/profile");
  };

  render() {
    return (
      <div className="body">
        <div>
          <ul className="navbar">
            <button type="button" name="dashboard" onClick={this.toDashboard}>
              <li className="navbarElem">Dashboard</li>
            </button>
            <button type="button" name="routines" onClick={this.toRoutines}>
              <li className="navbarElem">Routines</li>
            </button>
            <button type="button" name="profile" onClick={this.toProfile}>
              <li className="navbarElem">Profile</li>
            </button>
          </ul>
        </div>
        <Card>
          <Card.Header>Edit My Profile</Card.Header>
          <Card.Body>
            <h2> Name: </h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            ></input>
            <h2> Email: </h2>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            ></input>
            <h2> Password: </h2>
            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            ></input>
            <h2> Sex: </h2>
            <input
              type="text"
              placeholder="Sex"
              name="sex"
              onChange={this.handleChange}
            ></input>
            <h2> Height: </h2>
            <input
              type="text"
              placeholder="Height"
              name="height"
              onChange={this.handleChange}
            ></input>
            <p>
              {" "}
              <button
                id="saveChangedProfileBtn"
                className="btn btn-primary "
                onClick={this.updateProfile}
              >
                Save Changes
              </button>{" "}
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
