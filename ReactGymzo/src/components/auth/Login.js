import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    checkLogin(){
        console.log("checkLogin");
        if(this.props.loggedIn){
            this.props.history.push("/dashboard");
        }
    }
    
    handleSubmit(event){
        const{
            email,
            password
        } = this.state;

        event.preventDefault();
        console.log(email, password);

        this.props.handleLogin(email,password);
        this.checkLogin();
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        return(
        <div>
            <form onSubmit = {this.handleSubmit}>
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={this.state.email} 
                onChange = {this.handleChange} 
                required
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={this.state.password} 
                onChange = {this.handleChange} 
                required
            /> 
            <button type="submit">Login</button>
            </form>
        </div>
        );
    }
}
