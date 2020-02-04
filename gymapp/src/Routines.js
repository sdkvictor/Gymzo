import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'


export default class Routines extends Component {
    constructor(props){
        super(props);
        this.state={
            myRoutines:[]
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            this.getRoutines();
        }
      }

    getRoutines=()=>{
        let url = `http://localhost:8080/gymzoAPI/getAllRoutines?userId=${this.props.user.id}`;
        let settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log("getting all routines",responseJSON);
                this.handleShowRoutines(responseJSON);
            })
            .catch(error => {
                console.log(error);
            })
    }
    handleShowRoutines=(response)=>{
        this.setState({
            myRoutines: response
        });
        console.log(this.state.myRoutines);
    }

    componentDidMount=()=>{
        this.getRoutines();
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

    toRoutines=()=>{
        this.props.history.push("/routines");
    }
    toDashboard=()=>{
        this.props.history.push("/dashboard");
    }
    toProfile=()=>{
        this.props.history.push("/profile");
    }

    deleteRoutine=(event)=>{
        console.log(event.target.value);
        event.preventDefault();
        let url = `http://localhost:8080/gymzoAPI/deleteRoutine?routineId=${event.target.value}`;
        let settings = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                this.getRoutines();
                console.log("deleted routine",responseJSON);
            })
            .catch(error => {
                console.log(error);
            })
    }

    editRoutine=(event)=>{
        this.props.updateRoutineId(event.target.value);

        this.props.history.push("/routine");
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
            <h1> My Routines </h1>
            <div>
            <table>
                <tbody>
                {this.state.myRoutines.map((ex, i) => {
                    return (
                        <tr>
                            <td className="routineName">{ex.name}</td>
                            <td><button onClick={this.deleteRoutine} className="deleteRoutine" className="btn btn-primary " name="deleteRoutine" value={ex._id}>Delete</button> </td>
                            <td> <button  onClick={this.editRoutine} className="editRoutine" className="btn btn-primary " name="editRoutine" value={ex._id}>Edit</button> </td>
                            <td> <button onClick={this.setDefault} className="setDefaultRoutine" className="btn btn-primary " name="setDefaultRoutine" value={ex._id}>Set Default</button> </td>
                        </tr>
                    )})}
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