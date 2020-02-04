import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'
import DatePicker from 'react-date-picker';



export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            myDefaultRoutine:{},
            routineName:"",
            exercises:[],
            todayExercises:[],
            date: new Date(),
            todayWeekday:""
        }
    }

    getRoutineName=(id)=>{
        let url = `http://localhost:8080/gymzoAPI/getMyRoutine?routineId=${id}`;
        let settings = {
            method: "GET"
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                this.setState({routineName: responseJSON.name});
                console.log(responseJSON);
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    updateExercises = (id) =>{
        console.log("updating exercises array");

        let url = `http://localhost:8080/gymzoAPI/getAllExercises/?routineId=${id}`;
        let settings = {
            method: "GET"
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                this.setState({exercises: responseJSON});
                console.log(responseJSON);
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    getUser(){
        let url = `http://localhost:8080/gymzoAPI/profile/?userId=${this.props.user.id}`;
        let settings = {
            method: "GET"
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                this.handleDefaultRoutine(responseJSON);
                console.log("gets user", responseJSON);
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleDefaultRoutine=(response)=>{
        this.getDefault(response.defaultRoutine);
    }

    getDefault(defaultRoutine){
        if(defaultRoutine==undefined){
            this.setState({
                routineName: "No default routine has been defined"
            })
        }
        else{
            console.log("default routine", defaultRoutine);
            this.getRoutineName(defaultRoutine._id);
            this.updateExercises(defaultRoutine._id);
        }
    }


    saveRoutine = (event) => {
        console.log(this.state.date);
        event.preventDefault();
        const { weight } = this.state;
      let url = "http://localhost:8080/gymzoAPI/createInstanceExercise";
      let settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDate: this.state.date,
          finishDate: this.state.date,
          exerciseId:event.value,
          weight: 22
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

    seeRoutines = (event)=>{
        console.log("see routines");
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

    componentDidMount=()=>{
        this.getUser();
        this.getRoutineName();
        this.updateExercises();
        this.checkLoginStatus();
        this.checkTodayEx();
    }
    componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            this.checkTodayEx();
        }
      }

    checkTodayEx=()=>{
        console.log("check today ex", this.state.todayExercises);
        /*let newTodayExercises=[];

        this.setState({
            todayExercises:newTodayExercises
        })
        */
    }
    checkLoginStatus = () => {
        if (!this.props.loggedIn) {
          this.props.history.push("/login");
        }
      }

    onChange = (date) => {
        this.setState({ date });
        this.setState({todayExercises:[]});
    }

    render() {
        let today=this.state.date;
        var weekday=new Array(7);
            weekday[0]="Monday";
            weekday[1]="Tuesday";
            weekday[2]="Wednesday";
            weekday[3]="Thursday";
            weekday[4]="Friday";
            weekday[5]="Saturday";
            weekday[6]="Sunday";
        console.log(weekday[today.getDay()-1]);
        return (
        <div className = "body">
            <div>
            <ul className="navbar">
                <button type="button" name="routines" onClick={this.toRoutines}><li className= "navbarElem">Routines</li></button>
                <button type="button" name="dashboard" onClick={this.toDashboard}><li className= "navbarElem">Dashboard</li></button>
                <button type="button" name="profile" onClick={this.toProfile}><li className= "navbarElem">Profile</li></button>
            </ul>
        </div>
        <div id="myRoutine">
            <h1>{this.state.routineName}</h1>
            <h2>{weekday[today.getDay()-1]}</h2>
            <DatePicker
            onChange={this.onChange}
            value={this.state.date}
            />
            <table>
                <tbody>
                <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Repetitions</th>
                    <th>Weight</th>
                </tr>

                    {this.state.exercises.map((ex, i) => {
                        for(var j=0;j<ex.weekday.length;j++){
                            if(ex.weekday[j]==weekday[today.getDay()-1]){
                                console.log("found!");
                                this.state.todayExercises.push(ex);
                            }
                        }
                    return (
                        <div></div>
                    )})}

                    {this.state.todayExercises.map((ex, i) => {
                    return (
                        <tr>
                            <td className="exerciseName">{ex.name}</td>
                            <td> {ex.sets}</td>
                            <td> {ex.reps} </td>
                            <td> <input type="text" name="weight" className="weightIn"/></td>
                        </tr>
                    )})}

                </tbody>
            </table>
            <div id="routineButtons">
                <p> <button id="saveWeight" onClick={this.saveRoutine}>Save</button> </p>
            </div>
        </div>
        </div>
        );
    }
}