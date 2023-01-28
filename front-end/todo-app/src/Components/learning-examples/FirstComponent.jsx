import React, { Component } from 'react';

//Class Component
class FirstComponent extends Component {
    render() {
      return (
        <div className="FirstComponent">
          First Class Component
        </div>
      );
    }
  }
  
//Function Component
export function SecondComponent(){
return (
    <div className="SecondComponent">
    Second Function Component
    </div>
);
}

export default FirstComponent;