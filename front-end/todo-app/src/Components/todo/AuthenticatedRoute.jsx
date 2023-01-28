import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';
import {Navigate} from 'react-router-dom'

//避免直接輸入網址繞過authentication
class AuthenticatedRoute extends Component {
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            return {...this.props.children}//spread operator: all the elements in an array will be passed as an individual parameter
        }
        else {
            return <Navigate to="/login"/>
        }
    }
}

export default AuthenticatedRoute