import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./Home";
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
          <Home {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        <Route exact path={"/dashboard"}
        render ={props=>(
          <Dashboard {...props} handleSuccessfulAuth={this.handleSuccessfulAuth} loggedIn={this.state.loggedIn}/>
        )}
        />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
