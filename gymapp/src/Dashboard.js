import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, Container, CardGroup, ListGroup } from "react-bootstrap";
import { SERVER } from "./config";
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      data: {
        labels: ["1", "2"],
        datasets: [
          {
            label: "",
            fill: false,
            lineTension: 0.2,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [1, 2]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
    this.renderHeight();
    this.renderWeightEvolution();
  }

  checkLoginStatus = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  }
  
  renderWeightEvolution = () => {
    let url = `${SERVER}/gymzoAPI/getAllWeights/?userId=${this.props.user.id}`;

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
        this.handleWeights(responseJSON);
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderHeight = () => {
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
    let date1 = new Date();
    let date = new Date(response.dateOfBirth);

    let year = date1.getFullYear() - date.getFullYear();
    let hightStat =
      stateUpdate.currentWeight * 9.9 + response.height * 625 - 4.92 * year + 5;
    let lowStat =
      stateUpdate.currentWeight * 9.9 +
      response.height * 625 -
      4.92 * year -
      161;
    console.log(year);
    stateUpdate = {
      ...stateUpdate,
      currentHeight: response.height,
      name: response.name,
      age: year,
      hightStat: hightStat,
      lowStat: lowStat
    };
    this.setState(stateUpdate);
  }

  handleWeights(response) {
    this.state.data.labels = [];
    this.state.data.datasets[0].data = [];

    let stateUpdate = this.state;

    for (let i = 0; i < Object.keys(response).length; ++i) {
      let date = new Date(response[i].measureDate);
      let newDate = date.getMonth() + 1 + "-" + date.getDate();
      stateUpdate.data.labels = [...stateUpdate.data.labels, newDate];

      stateUpdate.data.datasets[0].data = [
        ...stateUpdate.data.datasets[0].data,
        response[i].weight
      ];
    }
    stateUpdate = {
      ...stateUpdate,
      currentWeight: response[Object.keys(response).length - 1].weight,
      data2: { ...stateUpdate.data }
    };
    this.setState(stateUpdate);

    stateUpdate.data2.datasets[0].data = [];

    for (let i = 0; i < Object.keys(response).length; ++i) {
      stateUpdate.data2.datasets[0].data = [
        ...stateUpdate.data2.datasets[0].data,
        response[i].weight / (this.state.currentHeight ^ 2)
      ];
    }
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
    var n = this.state.currentWeight / (this.state.currentHeight ^ 2);
    var low = this.state.lowStat * 1.5 - 1.55;
    var high = this.state.hightStat * 1.5 - 1.55;
    var today = new Date();
    var date = today.getMonth() + 1 + "/" + today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
        <Card className="header">
          <Card.Header>My Statistics</Card.Header>
          <Card.Body>
            <Card.Title>Welcome Back {this.state.name}!</Card.Title>
            <ListGroup>
              <ListGroup.Item>Age: {this.state.age}</ListGroup.Item>
              <ListGroup.Item>
                Current Weight: {this.state.currentWeight}
              </ListGroup.Item>
              <ListGroup.Item>
                Current Height: {this.state.currentHeight}
              </ListGroup.Item>
              <ListGroup.Item>Body Mass Index: {n.toFixed(2)}</ListGroup.Item>
              <ListGroup.Item>
                Resting Metabolic Rate (Low): {this.state.lowStat}
              </ListGroup.Item>
              <ListGroup.Item>
                Resting Metabolic Rate (High): {this.state.hightStat}
              </ListGroup.Item>
              <ListGroup.Item>
                Total Energy Expenditure (Min):{" "}
                {this.state.lowStat * 1.5 - 1.55} Calories per daay
              </ListGroup.Item>
              <ListGroup.Item>
                Total Energy Expenditure (Max):{" "}
                {this.state.hightStat * 1.5 - 1.55} Calories per daay
              </ListGroup.Item>
            </ListGroup>
            <Container>
              <CardGroup>
                <Card>
                  <Card.Header>My Weight Evolution</Card.Header>
                  <Card.Body>
                    <Line ref="chart" data={this.state.data} />
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Last Update: {date} @ {time}
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Header>My BMI Evolution</Card.Header>
                  <Card.Body>
                    <Line ref="chart" data={this.state.data2} />
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Last Update: {date} @ {time}
                  </Card.Footer>
                </Card>
              </CardGroup>
            </Container>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
