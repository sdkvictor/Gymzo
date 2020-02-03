import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'


export default class Routines extends Component {
    constructor(props){
        super(props);
    }

    addRoutine = (event) => {
        console.log("add routine");
        this.props.history.push("/createRoutine");
    }

    editRoutine = (event)=>{
        console.log("edit routine");
    }

    setDefault = (event) =>{
        console.log("set default");
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
            <h1> My Routines </h1>
            <div>
            <table>
                <tbody>
                <tr>
                    <td className="routineName">Routine Name 1</td>
                    <td> </td>
                    <td> <button id="editRoutinebtn" className="btn btn-primary ">Edit</button> </td>
                    <td> Default </td>
                </tr>
                <tr>
                    <td className="routineName">Routine Name 2</td>
                    <td> </td>
                    <td> <button id="editRoutinebtn" className="btn btn-primary ">Edit</button> </td>
                    <td> <button id="setDefaultbtn" className="btn btn-primary "> Set Default </button> </td>
                </tr>
                </tbody>
            </table>
            </div>
            <div id="routineButtons">
                <p></p>
                <p> <button id="addRoutinebtn" onClick={this.addRoutine}>Add Routine</button> </p>
            </div>
        </div>
        </div>
        );
    }
}