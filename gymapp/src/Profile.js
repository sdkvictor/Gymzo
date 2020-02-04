import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  Nav,
  Navbar,
  CardDeck,
  Row,
  Column,
  CardGroup
} from "react-bootstrap";
import { SERVER } from "./config";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.checkLoginStatus();
    this.renderProfile();
  }
  checkLoginStatus = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  };
  renderProfile = () => {
    console.log(this.state.user);
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

    stateUpdate = {
      ...stateUpdate,
      name: response.name,
      email: response.email,
      password: response.password,
      dateOfBirth: response.dateOfBirth,
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

  render() {
    let date = this.state.dateOfBirth;
    let newDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
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
          <Card.header>My Profile</Card.header>
          <Card.Body>
            <Card.Text>Name: {this.state.name}</Card.Text>
            <Card.Text>Email: {this.state.email}</Card.Text>
            <Card.Text>Password: {this.state.password}</Card.Text>
            <Card.Text>Date Of Birth: {newDate}</Card.Text>
            <Card.Text>Sex: {this.state.sex}</Card.Text>
            <Card.Text>Height: {this.state.Height}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
