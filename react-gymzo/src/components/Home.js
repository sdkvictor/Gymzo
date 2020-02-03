import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'


export default class Home extends Component {
    constructor(props){
        super(props);
    }

    saveRoutine = (event) => {
        console.log("saved");
    }

    seeRoutines = (event)=>{
        console.log("see routines");
    }

    render() {
        return (
        <div className = "body">
            <div>
            <ul className="navbar">
                <li className= "navbarElem"><a href="routines">Routines</a></li>
                <li className= "navbarElem"><a href="statistics">Statistics</a></li>
                <li className= "navbarElem"><a href="profile">Profile</a></li>
            </ul>
        </div>
        <div id="myRoutine">
            <h1>My Routine</h1>
            <h2>Weekday</h2>
            <table>
                <tbody>
                <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Repetitions</th>
                    <th>Weight</th>
                </tr>
                <tr>
                    <td id="ex1"> Exercise 1</td>
                    <td id="sets1"> 5</td>
                    <td id="rep1"> 10 </td>
                    <td id="weight1"><input type="text" name="weight" className="weightIn"/> </td>
                </tr>
                </tbody>
            </table>
            <div id="routineButtons">
                <p> <button id="saveWeight" onClick={this.saveRoutine}>Save</button> </p>
                <p> <button id="seeRoutines" onClick={this.seeRoutines}>See Routines</button> </p>
            </div>
        </div>
        </div>
        );
    }
}