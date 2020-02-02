import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Dashboard from './Dashboard';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      loggedIn:false,
      user:{}
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
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

  handleLogin(email, password){
    let url = "http://localhost:8080/gymzoAPI/login";
    let settings = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token'
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
            console.log("res from login",responseJSON);
            this.handleSuccessfulAuth(responseJSON);
        })
        .catch(error => {
            console.log(error);
        })
        event.preventDefault();
}

  componentWillMount(){
    this.checkLoginStatus();
    console.log("checking if loggedin");
  }
  

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
        <Route exact path={"/login"} 
        render ={props=>(
          <Login {...props} checkLoginStatus={this.checkLoginStatus} handleLogin={this.handleLogin} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/register"} 
        render ={props=>(
          <Registration {...props} handleLogin={this.handleLogin} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/dashboard"}
        render ={props=>(
          <Dashboard {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />

        <Route exact path={"/routines"}
        render ={props=>(
          <Routines {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />

        <Route exact path={"/newroutine"}
        render ={props=>(
          <NewRoutine {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        /> 
        <Route exact path={"/profile"}
        render ={props=>(
          <Profile {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/editroutine"}
        render ={props=>(
          <EditRoutine {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />

        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
