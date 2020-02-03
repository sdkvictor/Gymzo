import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Dashboard from './Dashboard';
import Routines from './Routines'
import CreateRoutine from './createRoutine'
import NewRoutine from './NewRoutine';
import NewExercise from './NewExercise';


export default class App extends Component {
  constructor(){
    super();
    this.state={
      loggedIn:false,
      user:{},
      currentRoutine:{},
      exercises:[],
      allRoutines:[]
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  updateExercises=(newExercises)=>{
    this.state.exercises.setState = newExercises;
  }

  updateExercises=(newExercises)=>{
    this.state.exercises.setState = newExercises;
  }
  
  updateCurrentRoutine=(newId,newName)=>{
    this.state.currentRoutine.setState={
      id: newId,
      name: newName
    }
  }

  checkLoginStatus(){
    console.log("check login",this.state);
    let token = localStorage.getItem('gm_token');

    let url = `http://localhost:8080/gymzoAPI/validate/${token}`;
        let settings = {
            method: "GET",
        }
        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
              if(responseJSON.message=="Success"){
                console.log("user from json",responseJSON.user);
                this.setState({
                  loggedIn:true,
                  user:{
                    id: responseJSON.id
                  }
                })
              }
              else{
                this.setState({
                  loggedIn:false,
                  user:{}
                })
              }
                console.log("res from validation",this.state);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                  loggedIn:false,
                  user:{}
                })
            })
            console.log("after validation",this.state);

  }


  handleSuccessfulAuth = (response) =>{
    this.setState({
      loggedIn: true,
      user:{
        id: response.id,
        token:response.token
      }
    });
    localStorage.setItem('gm_token', response.token);
    console.log(this.state);
  }

  componentDidMount(){
    this.checkLoginStatus();
    console.log("checking if loggedin");
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
        <Route exact path={"/"} 
        render ={props=>(
          <Home {...props} user={this.state.user} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/login"} 
        render ={props=>(
          <Login {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/register"} 
        render ={props=>(
          <Registration {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/routines"} 
        render ={props=>(
          <Routines {...props} user={this.state.user} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn} routineId={this.state.routineId}/>
        )}
        />
        <Route exact path={"/dashboard"}
        render ={props=>(
          <Dashboard {...props} user={this.state.user} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/createRoutine"}
        render ={props=>(
          <CreateRoutine {...props} updateExercises={this.updateExercises} exercises={this.state.exercises} updateCurrentRoutine={this.updateCurrentRoutine} currentRoutine={this.state.currentRoutine} user={this.state.user} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/newRoutine"}
        render ={props=>(
          <NewRoutine {...props} updateExercises={this.updateExercises} exercises={this.state.exercises} currentRoutine={this.state.currentRoutine} user={this.state.user} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/newExercise"}
        render ={props=>(
          <NewExercise {...props} updateExercises={this.updateExercises} exercises={this.state.exercises} currentRoutine={this.state.currentRoutine} user={this.state.user} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}