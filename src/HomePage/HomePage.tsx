import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Home</h1>
                <Link to ="/login">Login</Link><br/>
                <Link to ="/register">Register</Link>
                
            </div>
        )
    }
}

export default HomePage
