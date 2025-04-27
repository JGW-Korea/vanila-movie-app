import { Component } from "../core";

// Home Route
export default class Home extends Component {
  render() {
    this.el.innerHTML = /* html */ `<h1>Hello World</h1>`;
  }
}
