import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import { SERVER } from "./config";

export default class Profile extends Component {
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

  componentWillMount() {
    this.renderProfile();
  }

  checkLoginStatus = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  };
  renderProfile = () => {
    let url = `${SERVER}/gymzoAPI/profile/?userId=${this.props.user.id}`;

    let settings = {
      method: "GET"
    };

    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJSON => {
        this.handleProfile(responseJSON);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleProfile(response) {
    let stateUpdate = this.state;
    let date = new Date(response.dateOfBirth);
    let newDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    stateUpdate = {
      ...stateUpdate,
      name: response.name,
      email: response.email,
      dateOfBirth: newDate,
      sex: response.sex,
      height: response.height
    };
    this.setState(stateUpdate);
  }

  toRoutines = () => {
    this.props.history.push("/routines");
  };

  toDashboard = () => {
    this.props.history.push("/dashboard");
  };

  toProfile = () => {
    this.props.history.push("/profile");
  };

  redirectEdit = event => {
    this.props.history.push("/editProfile");
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
          <Card.Header>My Profile</Card.Header>
          <Card.Body>
            <p> Name: {this.state.name}</p>
            <p>Email: {this.state.email}</p>
            <p>Sex: {this.state.sex}</p>
            <p>Height: {this.state.height}</p>
            <p>Date of Birth: {this.state.dateOfBirth}</p>
            <p>
              {" "}
              <button
                id="editProfileBtn"
                className="btn btn-primary "
                onClick={this.redirectEdit}
              >
                Edit Profile
              </button>{" "}
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
