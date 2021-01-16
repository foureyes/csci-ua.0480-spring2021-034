import React from 'react';
import ReactDOM from 'react-dom';


class Counter extends React.Component {
  constructor() {
    super(); 
    this.state = {
      clicks: 0 
    }
  }

  handleClick(evt) {
    // must use set state to update props on state
    // (don't assign directly)
    // this causes re-render of component
    this.setState({clicks: this.state.clicks + 1}); 
  }

  render() {
    return (
      <div onClick={(evt) => this.handleClick(evt)} className="counter">{this.state.clicks}</div> 
    ); 
  
  }




}

ReactDOM.render(<div><Counter /><Counter /></div>, document.getElementById('root'));
// event handling
// add an inline onclick for click events
// reference a function
/*
class MyComponent extends React.Component {
  // create state
  // data owned / controlled by the component
  
  // use constructor to initialize state
  constructor() {
    super(); 
    this.state = {
      message: 'this is not an alarm!'
    }
    // this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt) {
    alert(this.props.foo); 
  }


  render() {
    return <div><h1>{this.state.message}</h1><div onClick={() => {this.handleClick()}}>click on me!!!!</div></div>   ;
  }
}
ReactDOM.render(<MyComponent foo="bar" />, document.getElementById('root'));
*/





// what should render method return?
// it should return a react element
// or an array of elements
// (also jsx fragment)
// you cannot return multiple JSX on their own
// DO NOT do this:
/*
return (
  <div>1</div>
  <div>2</div>
)
return createElement('div')createElement('div')
*/
/*
class MyComponent extends React.Component {
  render() {
    const numbers = [2, 3, 1, 5];
    const elements = numbers.map((num, i) => <div key={i}>{num}</div>);
    return elements;
  }
}
ReactDOM.render(<MyComponent />, document.getElementById('root'));
*/

/*
// this.props
// allows access to the attributes of a component
// this.props is defined by the part of the code that's doing the
// rendering
// ....the component is not responsible for managing props
// ....instead, whatever creates it must enter props (via attributes)

// component is a reusable bundle of elements
class MyComponent extends React.Component {
  // minimally, implement render
  // you have to return a react element
  // (either use jsx... or make sure to call createElement)
  render() {
    const times = this.props.times;
    let greeting = this.props.greeting;
    if(times) {
      greeting = greeting.repeat(times); 
    }
    return (
      <div><h1>{greeting} world</h1>{'this' + ' is' + ' a component!!!!'}</div> 
    );
  }
}
ReactDOM.render(
	<div><MyComponent greeting="hello" times="3" /><MyComponent greeting="hola" times="100" /><MyComponent greeting="hi" /></div>,
	document.body
);
*/


/*
ReactDOM.render(
  React.createElement('div', {className: 'foo'}, 'Hey... familiar!'),
	document.body
);
*/
/*
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/

