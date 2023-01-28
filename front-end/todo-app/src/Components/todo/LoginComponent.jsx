import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';


class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'super',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    //general
    handleChange(event) {
        //console.log(event.target.name);//name of element: "username"
        //console.log(event.target.value);//the value being changed
        //console.log(this.state)
        //update the state using the value being changed
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        // if(this.state.username==='super' && this.state.password==='dummy')
        // {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     //console.log('Login Successful')
        //     this.props.navigate(`/welcome/${this.state.username}`) //redirect api
        //     // this.setState({showSuccessMessage: true})
        //     // this.setState({hasLoginFailed: false})
        // }           
        // else
        // {
        //     //console.log('Invalid Credentials')
        //     this.setState({showSuccessMessage: false})
        //     this.setState({hasLoginFailed: true})
        // }
        
        //check if GET request suceeds, enter the URL 
        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password) 
        // .then(//login successful
        //     () => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //         this.props.navigate(`/welcome/${this.state.username}`)
        //     }
        // ).catch( //login failed
        //     () => {
        //         this.setState({showSuccessMessage: false})
        //         this.setState({hasLoginFailed: true})
        //     }        
        // )
        
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password) 
        .then(//get response with token => login successful
            (response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.navigate(`/welcome/${this.state.username}`)
            }
        ).catch( //login failed
            () => {
                this.setState({showSuccessMessage: false})
                this.setState({hasLoginFailed: true})
            }        
        )
    }

    // handleUsernameChange(event) {
    //     console.log(event.target.value);//the value being changed
    //     //update the state using the value being changed
    //     this.setState({username: event.target.value})
    // }

    // handlePasswordChange(event) {
    //     console.log(event.target.value);
    //     this.setState({password: event.target.value})
    // }

    //when value of username/password changes, state also changes
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                    {/* {this.state.showSuccessMessage && <div>Login Successful</div>} */}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent