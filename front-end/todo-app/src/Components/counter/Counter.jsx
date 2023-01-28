import React, { Component } from 'react';
import './Counter.css'
import PropTypes from 'prop-types';

class Counter extends Component {
     
     constructor(){ 
        super() //common error, in order to use 'this'
        this.state = { 
            counter: 0 //Total count
        }

        this.increment = this.increment.bind(this) //bind 'this' to the method, so 'this' can be used inside increatment method
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }

    render() {
        return (
          <div className="Counter">
            <CounterButton incrementMethod = {this.increment} decrementMethod = {this.decrement}/> 
            <CounterButton by = {5} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
            <CounterButton by = {10} incrementMethod = {this.increment} decrementMethod = {this.decrement}/>
            <span className="count">{this.state.counter}</span>
            <div><button className="reset" onClick={this.reset}>Reset</button></div>
          </div>
        );
    }
    //pass a method as property to child component(CounterButton)

    //parent increment method
    increment(by){
        //console.log(`increment by child - ${by}`)
        this.setState( //arrow function
            (prevState) => {
                return {counter: prevState.counter + by} //add to total count
            }
        );
    }

     //parent decrement method
     decrement(by){
        this.setState( //arrow function
            (prevState) => {
                return {counter: prevState.counter - by} //decrease from total count
            }
        );
    }

    reset(){
        this.setState({counter: 0})
    }
}

class CounterButton extends Component{
    //define the initial state in the constructor: counter = 0
    constructor(){ 
        super() //common error, in order to use 'this'
        // this.state = { //javascript object
        //     counter: 0 //variable
        // }

        // this.increment = this.increment.bind(this) //bind 'this' to the method, so 'this' can be used inside increatment method
        // this.decrement = this.decrement.bind(this)
    }
//render method
    render(){ 
        //const style = {fontSize: "60px", padding: "15px"}
        return (
            <div className="CounterButton">
                {/* <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button> */}
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
                {/*<span className="count"
                //stype = {style} //object
                >{this.state.counter}</span>*/}
            </div>
        );
    }
//increment method
    //update the state: counter++
//     increment(){
//     //increment = () => { //Alternative: arrow function prevents the need of binding
//         //console.log('increment');
//         //this.state.counter++ //do not change state directly
//         this.setState(
//             (prevState) => {
//                 return {counter: prevState.counter + this.props.by} //pass an object(state) with updated value
//             }
//         )
//         /*this.setState({
//                 counter: this.state.counter + this.props.by //pass an object(state) with updated value
//         });*/

//         //child increment method calls parent increment method
//         this.props.incrementMethod(this.props.by) //property method using property number
//     }
// //decrement method
//     decrement(){
//         this.setState(
//             (prevState) => {
//                 return {counter: prevState.counter - this.props.by} //pass an object(state) with updated value
//             }
//         )
//         //child increment method calls parent increment method
//         this.props.decrementMethod(this.props.by) //property method using property number
//     }
}

//set default value outside of the class
CounterButton.defaultProps = {
    by : 1
}
//put constraint on property type
CounterButton.propTypes = {
    by : PropTypes.number
}
    
export default Counter;