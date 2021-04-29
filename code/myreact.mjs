const MyReact = {
  _state: null,

  render(Component) {
    console.log(Component());
  },

  useState(initVal) {
    this._state = this._state || initVal;
    
    const setState = newVal => this._state = newVal;

    return [this._state, setState];
  }
}

export default MyReact
