import { Component } from "../core";
import movieStore, { searchMovies } from "../store/movie";

export default class Search extends Component {
  render() {
    this.el.classList.add("search");
    this.el.innerHTML = /* html */ `
      <input type="text" value="${movieStore.state.searchText}" placeholder="Enter the movie title to search!" />
      <button class="btn btn-primary">Search!</button>
    `;

    const inputEl = this.el.querySelector("input");

    // input 요소의 값이 변경될 때마다 상태값(searchText)을 업데이트하는 이벤트 핸들러
    inputEl.addEventListener("input", () => {
      movieStore.state.searchText = inputEl.value;
    });

    // input 요소에서 Enter 키를 눌렀을 때, 검색어가 있을 경우 영화 검색을 수행하는 이벤트 핸들러
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && movieStore.state.searchText.trim()) {
        searchMovies(1);
      }
    });

    // 버튼을 클릭했을 때, 검색어가 있을 경우 영화 검색을 수행하는 이벤트 핸들러
    const btnEl = this.el.querySelector("button");
    btnEl.addEventListener("click", () => {
      if (movieStore.state.searchText.trim()) {
        searchMovies(1);
      }
    });
  }
}
