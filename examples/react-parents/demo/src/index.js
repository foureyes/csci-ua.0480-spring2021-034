import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class GadgetFilter extends React.Component {

  constructor() {
    super(); 
    this.state = {
      filterVal: '', 
      gadgets: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.filter = this.filter.bind(this);
    this.updateGadgetList = this.updateGadgetList.bind(this);
  }

  updateGadgetList() {
    fetch(`http://localhost:3001/api/gadgets?gadgetType=${this.state.filterVal}`) 
      .then(response => response.json())
      .then(data => this.setState({gadgets: data}));
  }

  componentDidMount() {
    this.updateGadgetList(); 
  }

  handleChange(evt) {
    this.setState({filterVal: evt.target.value});
  }

  filter() {
    this.updateGadgetList(); 
  }

  render() {
    return (
      <div>
      <FilterForm handleChange={this.handleChange} filter={this.filter} filterVal={this.state.filterVal} />  
      <GadgetList gadgets={this.state.gadgets} />  
      </div>
    )
  }

}

function FilterForm(props) {
  return (
    <div>
    Gadget Type: <input type="text" onChange={props.handleChange} value={props.filterVal} />
    <input type="button" onClick={props.filter} value="filter mah gadgets!" /> 
    </div>
  );
}

function GadgetList(props) {
  const gadgets = props.gadgets.map(g => <li>{g.name}, {g.type}</li>)
  return (
    <ul>
      {gadgets}
    </ul>
  )
}

ReactDOM.render(<GadgetFilter />, document.getElementById('root'));
/*
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
