import React, { Component } from 'react';

const Dashboard = props => {
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <h1>Status:{props.loggedIn}</h1>
            </div>
        </div>
    );
}
export default Dashboard;