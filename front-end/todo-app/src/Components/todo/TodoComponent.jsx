import React, {Component} from "react"
import moment from "moment"
import { Formik, Form, Field, ErrorMessage } from "formik"
import TodoDataService from "../../api/todo/TodoDataService.js"
import AuthenticationService from "./AuthenticationService.js"

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if(this.state.id === -1)//create a new todo
            return

        let username = AuthenticationService.GetLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(
            response => {
                //console.log(response)
                this.setState({
                    description : response.data.description,
                    targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            }
        )
    }

    onSubmit(values) {
        //console.log(values)
        let username = AuthenticationService.GetLoggedInUserName()
        let todo = {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate
        }
        if(this.state.id === -1)//create a new todo
        {
            
            TodoDataService.createTodo(username, todo).then( //if submit succeeds
                () => {this.props.navigate('/todos') }//redirect api
            ) 
        }
        else{
            let username = AuthenticationService.GetLoggedInUserName()
            TodoDataService.updateTodo(username, this.state.id, todo).then( //if submit succeeds
                () => {this.props.navigate('/todos') }//redirect api
            )      
        }
        
    }

    validate(values) {
        let errors = {}
        if(!values.description)
            errors.description = "Enter a description"
        else if(values.description.length < 5)
            errors.description = "Enter at least 5 characters in description"

        if(!moment(values.targetDate).isValid())
            errors.targetDate = "Enter a valid target date"
        return errors
    }

    render() {
        let {description, targetDate} = this.state
        // let description = this.state.description
        // let targetDate = this.state.targetDate

        return (<div>
                    <h1>Todo for id - {this.state.id}</h1>
                    <div className="container">
                        <Formik
                            initialValues={{
                                description : description,//key : value
                                targetDate : targetDate
                            }}
                            onSubmit={this.onSubmit}
                            //only check errors when clicking submit
                            validateOnChange={false}//not check every time changing values
                            validateOnBlur={false}//not check every time leaving the column
                            validate={this.validate}
                            enableReinitialize={true}
                        >
                            {//create a form
                                (props) => (
                                    <Form>
                                    <ErrorMessage className="alert alert-warning" name="description" component="div"/>
                                    <ErrorMessage className="alert alert-warning" name="targetDate" component="div"/>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Target Date</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>                    
                </div>)
    }
}

export default TodoComponent