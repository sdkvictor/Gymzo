import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation : "",
            name: "",
            dateOfBirth: "",
            sex: "",
            height: "",
            registrationErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(event){
        const{
            email,
            password,
            password_confirmation,
            name,
            dateOfBirth,
            sex,
            height
        } = this.state;

        event.preventDefault();
        console.log(email, password);

        let url = "http://localhost:8080/gymzoAPI/createUser";
        let settings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer  token'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                dateOfBirth : dateOfBirth,
                sex : sex,
                height: height
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
                this.props.handleSuccessfulAuth(responseJSON);
            })
            .catch(error => {
                console.log(error);
            })
            event.preventDefault();
        /*
        axios.post("http://localhost:8080/gymzoAPI/createUser", {
            user:{
                email: email,
                password: password,
                name: name,
                dateOfBirth : dateOfBirth,
                sex : sex,
                height: height
            }
        },
        {withCredentials: true} 
        ).then(response =>{
            console.log("registration res" , response);
        }).catch(error=>{
            console.log("registration error", error);
        });
        */
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
            <input 
                type="password" 
                name="password_confirmation" 
                placeholder="Password confirmation" 
                value={this.state.password_confirmation} 
                onChange = {this.handleChange} 
                required
            />
            <input 
                type="text" 
                name="name" 
                placeholder="name" 
                value={this.state.name} 
                onChange = {this.handleChange} 
                required
            />
            <input 
                type="text" 
                name="dateOfBirth" 
                placeholder="dateOfBirth" 
                value={this.state.dateOfBirth} 
                onChange = {this.handleChange} 
                required
            />
            <input 
                type="text" 
                name="sex" 
                placeholder="sex" 
                value={this.state.sex} 
                onChange = {this.handleChange} 
                required
            />
            <input 
                type="text" 
                name="height" 
                placeholder="height" 
                value={this.state.height} 
                onChange = {this.handleChange} 
                required
            />
            <button type="submit">Register</button>
            </form>
        </div>
        );
    }
}
