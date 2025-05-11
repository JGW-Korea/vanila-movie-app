import { Component } from "../core";

export default class Footer extends Component {
  constructor() {
    super({
      tagName: "footer",
    });
  }

  render() {
    this.el.innerHTML = /* html */ `
      <div>
        <a href="https://github.com/JGW-Korea/vanila-movie-app">GitHub Repository</a>
      </div>
      
      <div>
        <a href="https://github.com/JGW-Korea">${new Date().getFullYear()} JGW-Vito</a>
      </div>
    `;
  }
}
