import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import "./css/home.css";
import { SERVER } from "./config";

export default class CreateRoutine extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  };
  logout = event => {
    localStorage.clear();
    this.props.history.push("/login");
    alert("You have been logged out.");
  };
  createNewRoutine = event => {
    console.log("creating routine");
    const { routineName } = this.state;
    event.preventDefault();

    if (routineName != "" && routineName != undefined) {
      console.log("routine name", routineName);

      let url = `${SERVER}/gymzoAPI/createRoutine`;
      let settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: routineName,
          userId: this.props.user.id
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
          this.handleNewRoutne(responseJSON);
          this.props.history.push("/routine");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleNewRoutne(response) {
    this.props.updateCurrentRoutine(response._id, response.name);
    this.props.updateRoutineId(response._id);
    console.log(this.props.currentRoutine);
    console.log(response);
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
  toHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="body">
        <div>
          <ul className="navbar">
            <button type="button" name="home" onClick={this.toHome}>
              <li className="navbarElem">Home</li>
            </button>
            <button type="button" name="dashboard" onClick={this.toDashboard}>
              <li className="navbarElem">Dashboard</li>
            </button>
            <button type="button" name="routines" onClick={this.toRoutines}>
              <li className="navbarElem">Routines</li>
            </button>
            <button type="button" name="profile" onClick={this.toProfile}>
              <li className="navbarElem">Profile</li>
            </button>
            <button className="btn btn-primary " onClick={this.logout}>
              Logout
            </button>
          </ul>
        </div>
        <div id="myRoutine">
          <h1> Create New Routine </h1>
          <div>
            <h2> Name: </h2>
            <input
              type="text"
              placeholder="Routine Name"
              name="routineName"
              onChange={this.handleChange}
            ></input>
          </div>
          <p></p>
          <p>
            {" "}
            <button id="createRoutineBtn" onClick={this.createNewRoutine}>
              Create Routine
            </button>{" "}
          </p>
        </div>
      </div>
    );
  }
}
