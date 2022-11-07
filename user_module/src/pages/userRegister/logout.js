import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

class logout extends Component {
    constructor(props) {
        super(props)
        // localStorage.removeItem('token')
        localStorage.clear();
    }
    render() {
        return <Redirect to="/home"/>
    }
}

export default logout;