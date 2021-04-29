import MyReact from './myreact.mjs';

function Foo() {
  const [num, setNum] = MyReact.useState(0);
  setNum(num + 1);
  return `<div>${num}</div>`
}

MyReact.render(Foo);
MyReact.render(Foo);
















/*
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
*/
