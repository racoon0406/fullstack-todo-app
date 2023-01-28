import React, {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import moment from 'moment';

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { //a list
            todos : [
                // {id : 1, description : 'learn react', done : false, targetDate : new Date()},
                // {id : 2, description : 'exercise', done : false, targetDate : new Date()},
                // {id : 3, description : 'sleep', done : false, targetDate : new Date()}
            ],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }
    
    //mounting: the process of putting the component on the browser
    //call API to get data from backend
    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.GetLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                //console.log(response)
                this.setState({todos : response.data})
            }
        )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.GetLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message : `Delete of todo ${id} successful!`})
                this.refreshTodos()
            }          
        )
    }

    updateTodoClicked(id) {
        //console.log("Update " + id)
        this.props.navigate(`/todos/${id}`) //redirect api
    }

    addTodoClicked() {
        this.props.navigate('/todos/-1') //redirect api
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">                   
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (//loop: for each todo in todos list, generate codes after =>
                                    todo => //arrow function presents how each element should be shown
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className="btn btn-success" onClick = {() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick = {() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }                       
                        </tbody>
                    </table>
                    <div className="row">
                            <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default ListTodosComponent