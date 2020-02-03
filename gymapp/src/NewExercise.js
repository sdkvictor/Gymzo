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
            weekday:""
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
                routineId: this.props.currentRoutine.setState.id,
                sets: sets,
                reps: reps,
                weekday: "Monday"
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
    }

    updateExercises = () =>{
        console.log("updating exercises array");

        let url = `http://localhost:8080/gymzoAPI/getAllExercises/?routineId=${this.props.currentRoutine.setState.id}`;
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
                this.props.exercises = responseJSON;
                console.log(responseJSON);
                console.log(this.props.currentRoutine.exercises);
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

    render() {
        return (
        <div className="body">
            <div>
            <ul className="navbar">
                <li className= "navbarElem"><a href="routines">Routines</a></li>
                <li className= "navbarElem"><a href="statistics">Statistics</a></li>
                <li className= "navbarElem"><a href="profile">Profile</a></li>
            </ul>
        </div>
        <div id="myRoutine">
            <h1>{this.props.currentRoutine.name}</h1>
            <div>
                <p>Exercise Name: <input type="text" name="name" onChange = {this.handleChange}></input></p>
                <p>Sets: <input type="text" name="sets" onChange = {this.handleChange}></input></p>
                <p>Repetitions per set: <input type="text" name="reps" onChange = {this.handleChange}></input></p>
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