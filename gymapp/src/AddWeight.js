import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import { SERVER } from "./config";

export default class AddWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: ""
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

  addWeight = event => {
    event.preventDefault();
    let url = `${SERVER}/gymzoAPI/createWeight`;
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.props.user.id,
        weight: this.state.weight,
        measureDate: new Date()
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
        this.handleCreate(responseJSON);
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleCreate(response) {
    console.log(response);
    this.props.history.push("/dashboard");
  }
  logout = event => {
    localStorage.clear();
    this.props.history.push("/login");
    alert("You have been logged out.");
  };
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
        <Card>
          <Card.Header>Add new Weigth Measurement</Card.Header>
          <Card.Body>
            <h2> Weight: </h2>
            <input
              type="text"
              placeholder="Weight in Kg"
              name="weight"
              onChange={this.handleChange}
            ></input>
            <p></p>
            <p>
              {" "}
              <button
                id="saveWeightBtn"
                className="btn btn-primary "
                onClick={this.addWeight}
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
