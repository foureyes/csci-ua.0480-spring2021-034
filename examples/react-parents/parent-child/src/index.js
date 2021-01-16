import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SampleForm extends React.Component {

  constructor() {
    // state will contain what should be the value of our text field 
    super();
    this.state = {
      textValue: '' 
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    // evt.target is element that was changed
    // evt.target.value
    this.setState({textValue: evt.target.value}); 
  }

  render() {
    // send state back down into value of text input
    return (<div>
      
      <input onChange={this.handleChange} value={this.state.textValue} type="text" />
      <h1>hello {this.state.textValue}</h1>
      </div>);

  }
}

ReactDOM.render(<SampleForm />, document.getElementById('root'));




// <input type="text"> ...hello
// someElement.value
// cede control of the value attribute to the actual react component
// (react component will set value, onchange)

/*
class MyApp extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      counts: (Array(+props.counters)).fill(0)
    }
  }

  increment(evt, i) {
    const copy = this.state.counts.slice();    
    copy[i] = copy[i] + 1;
    this.setState({counts: copy});
  }

  render() {
    const counters = this.state.counts.map((count, i) => {
      return (
        <Counter incrementFunction={(evt) => this.increment(evt, i)} val={count} key={i} /> 
      ); 
    })

    const sum = this.state.counts.reduce((acc, ele) => {return acc + ele;}, 0);

    return (
      <div>
      {counters}    
      <Sum sum={sum} />
      </div>
    ) 
  }
}

function Counter(props) {
  return <h1 onClick={props.incrementFunction}>{props.val}</h1>
}

function Sum(props) {
  return <h1>{props.sum}</h1>
}


ReactDOM.render(<MyApp counters="5" />, document.getElementById('root'));
*/
/*
class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
      <Child clickHandler={this.handleClick} val={this.state.count} />
    );
  }
}
*/

/*
// functional component
function Child(props) {
    return (<h1 onClick={props.clickHandler}>Child Val: {props.val}</h1>);
}

class Child extends React.Component {
  render() {
    return (<h1 onClick={this.props.clickHandler}>Child Val: {this.props.val}</h1>);
  
  }
}

*/

/*
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (<h1 onClick={(evt) => this.handleClick(evt)}>{this.state.count}</h1>);
  }
}

ReactDOM.render(<div><Counter /><Counter /><Counter /></div>, document.getElementById('root'));
*/
/*
class MyComponent extends React.Component {
  constructor() {
    super(); 
    this.state = {
      names: ['alice', 'bob', 'carol'] 
    } 
  }

  render() {
    const divs = this.state.names.map(n => <div>{n}</div>);
    return (
      <div>
      <h1>React Demo</h1> 
      <p>{this.props.greeting}</p>
      {divs}
      </div>
    ); 
  }
}
*/

/*
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
