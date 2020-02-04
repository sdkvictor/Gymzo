import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'



export default class NewExercise extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            sets:"",
            reps:"",
            weekday:[]
        };
    }

    componentDidMount(){
        this.checkLoginStatus();
    }

    checkLoginStatus = ()=>{
        if(!this.props.loggedIn){
            this.props.history.push("/login");
        }
    }

    addExercise = (event) =>{
        console.log("adding a new exercise");
        const{
            name,
            sets,
            reps,
            weekday
        } = this.state;

        event.preventDefault();
        console.log(sets, reps, weekday);

        let url = "http://localhost:8080/gymzoAPI/createExercise";
        let settings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                routineId: this.props.routineId,
                sets: sets,
                reps: reps,
                weekday: weekday
            })
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                this.handleNewExercise(responseJSON);
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleNewExercise(response){
        console.log(response);
        this.updateExercises();
        this.props.history.push("/routine");
    }

    updateExercises = () =>{
        console.log("updating exercises array");

        let url = `http://localhost:8080/gymzoAPI/getAllExercises/?routineId=${this.props.routineId}`;
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
                this.props.updateExercises(responseJSON);
                console.log(responseJSON);

            })
            .catch(error => {
                console.log(error);
            })
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeWeekday=(event)=>{
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.state.weekday = value;
        console.log(this.state.weekday);
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
        <div className="body">
            <div>
            <ul className="navbar">
                <button type="button" name="routines" onClick={this.toRoutines}><li className= "navbarElem">Routines</li></button>
                <button type="button" name="dashboard" onClick={this.toDashboard}><li className= "navbarElem">Dashboard</li></button>
                <button type="button" name="profile" onClick={this.toProfile}><li className= "navbarElem">Profile</li></button>
            </ul>
        </div>
        <div id="myRoutine">
            <h1>{this.props.currentRoutine.name}</h1>
            <div>
                <p>Exercise Name: <input type="text" name="name" onChange = {this.handleChange}></input></p>
                <p>Sets: <input type="text" name="sets" onChange = {this.handleChange}></input></p>
                <p>Repetitions per set: <input type="text" name="reps" onChange = {this.handleChange}></input></p>
                <label for="weekday">Weekday:</label>
                <select multiple name="weekday"onChange={this.handleChangeWeekday}>
                    <option value={"Monday"}>Monday</option>
                    <option value={"Tuesday"}>Tuesday</option>
                    <option value={"Wednesday"}>Wednesday</option>
                    <option value={"Thursday"}>Thursday</option>
                    <option value={"Friday"}>Friday</option>
                    <option value={"Saturday"}>Saturday</option>
                    <option value={"Sunday"}>Sunday</option>
                </select>
            </div>
            <div id="addExerciseSpace">
                <p></p>
                <p> <button id="addExercise" onClick={this.addExercise}>Save</button> </p>
            </div>
        </div>
        </div>
        );
    }
}