import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import withNavigation from './WithNavigation';
import withParams from './WithParams';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import ListTodosComponent from './ListTodosComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import WelcomeComponent from './WelcomeComponent';
import LogoutComponent from './LogoutComponent';
import ErrorComponent from './ErrorComponent';
import TodoComponent from './TodoComponent';

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent)
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent)
        const WelcomeComponentWithParams = withParams(WelcomeComponent)
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent)
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent))

        return (//route starting with "/login" will show LoginComponent
            <div className = "TodoApp">               
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />}/>
                        <Route path="/login" element={<LoginComponentWithNavigation />}/>
                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>}/>
                        <Route path="/todos/:id" element={<AuthenticatedRoute><TodoComponentWithParamsAndNavigation /></AuthenticatedRoute>}/>
                        <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponentWithNavigation /></AuthenticatedRoute>}/>                       
                        <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>}/>
                        <Route path="*" element={<ErrorComponent />}/>
                    </Routes>
                    <FooterComponent/>
                </Router>               
                {/* <LoginComponent/>
                <WelcomeComponent/> */}
            </div>
        )
    }
}


// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowLoginSuccessMessage(props){
//     if(props.showSuccessMessage){
//         return <div>Login Successful</div>
//     }
//     return null
// }


export default TodoApp