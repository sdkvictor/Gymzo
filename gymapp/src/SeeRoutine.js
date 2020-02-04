import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'


export default class SeeRoutine extends Component {
    constructor(props){
        super(props); 
        this.state={
            routineName:""
        };
    }

    componentDidMount(){
        this.checkLoginStatus();
        this.updateExercises();
        this.getRoutineName();
    }

    getRoutineName=()=>{
        let url = `http://localhost:8080/gymzoAPI/getMyRoutine?routineId=${this.props.routineId}`;
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

    checkLoginStatus = ()=>{
        if(!this.props.loggedIn){
            this.props.history.push("/login");
        }
    }


    addExercise=()=>{
        this.props.history.push("/newExercise");
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
        <div className="myRoutine">
            <h1>{this.state.routineName}</h1>
            <div>
            <table>
                <tbody>
                    {this.props.exercises.map((ex, i) => {
                    return (
                        <tr>
                            <td className="exerciseName">{ex.name}</td>
                            <td> </td>
                            <td> <button className="editExercise" className="btn btn-primary ">Edit</button> </td>
                            <td> <button className="deleteExercise" className="btn btn-primary "> Delete </button> </td>
                        </tr>
                    )})}
                </tbody>
            </table>
            </div>
            <div id="addExerciseSpace">
                <p></p>
                <p> <button id="addExercise" onClick={this.addExercise}>Add Exercise</button> </p>
            </div>
        </div>
        </div>
        );
    }
}