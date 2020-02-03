import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'


export default class NewRoutine extends Component {
    constructor(props){
        super(props); 
    }

    componentDidMount(){
        this.checkLoginStatus();
        console.log(this.props.currentRoutine);
        console.log(this.props.currentRoutine.setState.name);
    }

    checkLoginStatus = ()=>{
        if(!this.props.loggedIn){
            this.props.history.push("/login");
        }
    }

    addExercise=()=>{
        this.props.history.push("/newExercise");
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
            <h1>{this.props.currentRoutine.setState.name}</h1>
            <div>
            <table>
                <tbody>
                    {this.props.exercises.map((ex, i) => {
                    return (
                        <tr>
                            <td className="exerciseName">ex.name</td>
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