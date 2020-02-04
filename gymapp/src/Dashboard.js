import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
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
    this.renderWeightEvolution();
  }

  checkLoginStatus = () => {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  };
  renderWeightEvolution = () => {
    let url = `http://localhost:8080/gymzoAPI/getAllWeights/?userId=${this.props.user.id}`;

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
    this.setState(stateUpdate);
    console.log(this.state.data);
  }

  toRoutines=()=>{
    this.props.history.push("/routines");
}
toDashboard=()=>{
    this.props.history.push("/dashboard");
}
toProfile=()=>{
    this.props.history.push("/profile");
}
  render() {
    return (
      <div>
        <div>
          <ul className="navbar">
                <button type="button" name="routines" onClick={this.toRoutines}><li className= "navbarElem">Routines</li></button>
                <button type="button" name="dashboard" onClick={this.toDashboard}><li className= "navbarElem">Dashboard</li></button>
                <button type="button" name="profile" onClick={this.toProfile}><li className= "navbarElem">Profile</li></button>
          </ul>
        </div>
        <div>
          <h1>Dashboard</h1>
          <h1>
            Status:
            {/*{props.loggedIn}*/}
          </h1>
        </div>
        <div>
          <h1></h1>
        </div>
        <Card>
          <Card.Body>
            <Card.Title>My Weight Evolution</Card.Title>
            <Line ref="chart" data={this.state.data} />
          </Card.Body>
        </Card>
        {console.log(this.state.data)}
      </div>
    );
  }
}
