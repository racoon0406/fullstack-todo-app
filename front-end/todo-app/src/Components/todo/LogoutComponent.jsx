import React, {Component} from 'react';

class LogoutComponent extends Component {
    render() {
        return (//bootstrap container
            <>
                <h1>You are logged out.</h1>
                <div className="container">
                    Thank you for using our application.
                </div>
            </>
        )
    }
}

export default LogoutComponent