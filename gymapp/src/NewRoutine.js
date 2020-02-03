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
    }

    checkLoginStatus = ()=>{
        if(!this.props.loggedIn){
            this.props.history.push("/login");
        }
    }

    getNewRoutine = (event) =>{
        console.log("getting new routine");
        const{
            email,
            password
        } = this.state;

        event.preventDefault();
        console.log(email, password);

        let url = "http://localhost:8080/gymzoAPI/getRoutine";
        let settings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
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
                this.createNewRoutine();
            })
            .catch(error => {
                console.log(error);
            })
            event.preventDefault();
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