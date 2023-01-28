import React, { Component } from 'react';
import FirstComponent, { SecondComponent } from './Components/learning-examples/FirstComponent';
import Counter from './Components/counter/Counter';
import TodoApp from './Components/todo/TodoApp';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter/> */}
        <TodoApp/>
      </div>
    );
  }
}
//include the class component as part of root component(App)

class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        Hello world!
        <FirstComponent></FirstComponent> 
        <SecondComponent></SecondComponent> 
      </div>
    );
  }
}


export default App;