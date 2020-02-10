import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import './css/home.css'
import DatePicker from 'react-date-picker';
import { useAlert } from 'react-alert'



export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            myDefaultRoutine:{},
            routineName:"",
            exercises:[],
            todayExercises:[],
            date: new Date(),
            todayWeekday:"",
            weights:[],
            found:false,
            prevWeights:[]
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

    updateInstWeight(response, w, id){
        console.log("updating instance", response);
        let url = `http://localhost:8080/gymzoAPI/updateInstanceExercise/?instanceExerciseId=${id}`;

        let settings = {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                weight: w
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
                console.log("updated instance",responseJSON);
            })
            .catch(error => {
            console.log(error);
            });

    }

    createInstance(index, id){
        let url = "http://localhost:8080/gymzoAPI/createInstanceExercise";

        let settings = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            startDate: this.state.date.setHours(0,0,0,0),
            finishDate: this.state.date.setHours(0,0,0,0),
            exerciseId: id,
            weight: this.state.weights[index]
            })
        };
        console.log("sdate", this.state.date);
        console.log("exid", id);
        console.log("index", index);
        fetch(url, settings)
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log("created instance",responseJSON);
            const alert = useAlert();
            alert.show('Saved');
            })
            .catch(error => {
            console.log(error);
            });
    }

    saveRoutine = (event) => {
        console.log(this.state.date);
        event.preventDefault();
        let id = event.target.name;
        let w = event.target.value;
        let url = `http://localhost:8080/gymzoAPI/getAllInstanceExercises/?exerciseId=${event.target.name}`;
        let settings = {
            method: "GET"
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else if(response.status==400){
                    this.createInstance(w, id);
                    console.log("creating new instance");
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                this.handleSaveRoutine(responseJSON, id, w);
                console.log("updating instance weight", responseJSON);
            })
            .catch(error => {
                console.log(error);
            })

    }

    handleSaveRoutine=(response,id,weight)=>{
        let currDate = this.state.date;
        currDate.setHours(0,0,0,0);
        let date = currDate.toISOString();
        let found = false;
        let instId = "";
        for(var i=0;i<response.length;i++){
            let dateElem = response[i].startDate;
            console.log("dateElem" ,dateElem);
            console.log("currDate",date);
            if(date===dateElem){
                found=true;
                instId = response[i]._id;
            }
        }
        if(found){
            console.log(this.state.weights[weight]);
            this.updateInstWeight(response,this.state.weights[weight],instId);
        }
        else{
            this.createInstance(weight, id);
        }
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
        let emptyArray=[];
        for(var i=0;i<this.state.todayExercises.length;i++){
            if(emptyArray.length<this.state.todayExercises.length){
                emptyArray.push(0);
            }
        }
        this.setState({
            weights:emptyArray
        })
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

    updateWeight=(event)=>{
        this.state.weights[event.target.id] = event.target.value;
        console.log("weights",this.state.weights);
    }

    getWeight=(id)=>{
        let url = `http://localhost:8080/gymzoAPI/getAllInstanceExercises/?exerciseId=${id}`;
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
                this.setWeight(responseJSON);
                console.log("gets instances", responseJSON);
                
            })
            .catch(error => {
                console.log("failed instances",error);
                return 0;
            })
    }

    setWeight=(response)=>{
        let currDate = this.state.date;
        currDate.setHours(0,0,0,0);
        let date = currDate.toISOString();
        let found = false;
        let weight = "";
        for(var i=0;i<response.length;i++){
            let dateElem = response[i].startDate;
            console.log("dateElem" ,dateElem);
            console.log("currDate",date);
            if(date===dateElem){
                found=true;
                weight = response[i].weight;
                console.log(response[i].weight);
            }
        }
         this.state.prevWeights.push(weight);  
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
                    <th> Save</th>
                    <th> Saved Weight</th>
                </tr>

                    {this.state.todayExercises.map((ex, i) => {
                    return (
                        <tr>
                            <td className="exerciseName">{ex.name}</td>
                            <td> {ex.sets}</td>
                            <td> {ex.reps} </td>
                            <td> <input type="text" id={i} name={ex._id} onChange={this.updateWeight} className="weightIn" value={this.getWeight(ex._id)}/></td>
                            <td> <button id="saveWeight" value={i} name={ex._id} onClick={this.saveRoutine}> Save</button> </td>
                            <td> {this.state.prevWeights[i]}</td>
                        </tr>
                    )
                    })}

                </tbody>
            </table>
        </div>
        </div>
        );
    }
}