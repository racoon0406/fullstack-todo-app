import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {welcomeMessage : ''}
    }
    
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.params.name}. You can manage your todos <Link to ="/todos">here</Link>.
                </div> 
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get welcome message</button>
                </div> 
                <div>
                    {this.state.welcomeMessage}
                </div>    
            </div>        
        )
    }

    retrieveWelcomeMessage() {
        //console.log('retrieve clicked')
        // HelloWorldService.executeHelloWorldService()//get a promise back
        //HelloWorldService.executeHelloWorldBeanService()
        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
        //if the request succeeds
        .then( response => this.handleSuccessfulResponse(response) )
        //if the request fails
        .catch( error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({welcomeMessage : response.data.message})
    }

    handleError(error) {
        console.log(error.response)
        //in case not getting the response back at all
        let errorMessage = ''
        if(error.message)//system error message
            errorMessage += error.message
        if(error.response && error.response.data)//response
            errorMessage += error.response.data.message
        this.setState({welcomeMessage : errorMessage})
    }
}

export default WelcomeComponent