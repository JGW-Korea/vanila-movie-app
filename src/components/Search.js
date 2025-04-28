import { Component } from "../core";

export default class Search extends Component {
  render() {
    this.el.classList.add("search");
    this.el.innerHTML = /* html */ `
      <input type="text" placeholder="Enter the movie title to search!" />
      <button class="btn btn-primary">Search!</button>
    `;

    const inputEl = this.el.querySelector("input");

    // input 요소의 value 값이 변경될 때 마다 발생하는 이벤트 핸들러 등록
    inputEl.addEventListener("input", () => {});

    // input 요소에 엔터(Enter) 키를 눌렀을 경우 발생하는 이벤트 핸들러 등록
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
      }
    });

    // button 요소를 클릭했을 때 발생하는 이벤트 핸들러 등록
    const btnEl = this.el.querySelector("button");
    btnEl.addEventListener("click", () => {});
  }
}
