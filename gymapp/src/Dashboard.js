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
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["1", "2"],
        datasets: [
          {
            label: "My Weight Evolution",
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
  };
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
    stateUpdate = {
      ...stateUpdate,
      currentHeight: response.height,
      name: response.name
    };
    this.setState(stateUpdate);
  }

  handleWeights(response) {
    this.state.data.labels = [];
    this.state.data.datasets[0].data = [];

    let stateUpdate = this.state;

    for (let i = 0; i < Object.keys(response).length; ++i) {
      let date = new Date(response[i].measureDate);
      let newDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
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
  render() {
    console.log(this.state);
    var n = this.state.currentWeight / (this.state.currentHeight ^ 2);
    var today = new Date();
    var date = today.getMonth() + 1 + "/" + today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return (
      <div>
        <Navbar className="nav">
          <Nav>
            <Nav.Item>
              <Nav.Link href="routines">Routines</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="statistics">Statistics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="profile">Profile</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <Card className="header">
          <Card.Header>My Statistics</Card.Header>
          <Card.Body>
            <Card.Title>Welcome Back {this.state.name}!</Card.Title>
            <Row>
              <CardDeck>
                <Card>
                  <Card.Header>Current Weight</Card.Header>
                  <Card.Body>
                    <Card.Text>{this.state.currentWeight} Kilograms </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Current Height</Card.Header>
                  <Card.Body>
                    <Card.Text>{this.state.currentHeight} Meters</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Body Mass Index</Card.Header>
                  <Card.Body>
                    <Card.Text> {n.toFixed(4)} BMI</Card.Text>
                  </Card.Body>
                </Card>
              </CardDeck>
            </Row>
            <Row className="row">
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
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
