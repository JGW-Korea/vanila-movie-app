import { Component } from "../core";
import movieStore from "../store/movie";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();

    // 영화 리스트 항목이 수정될 경우 리렌더링 발생
    movieStore.subscribe("movies", () => {
      this.render();
    });

    // 스피닝 로딩 상태 값이 수정될 경우 리렌더링 발생
    movieStore.subscribe("loading", () => {
      this.render();
    });

    // 에러 메세지 상태 값이 수정된 경우 리렌더링 발생
    movieStore.subscribe("message", () => {
      this.render();
    });
  }

  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
      ${
        movieStore.state.message
          ? `<div class="message">${movieStore.state.message}</div>`
          : `<div class="movies"></div>`
      }
      <div class="spinning-loader hide"></div>
    `;

    // Error 메세지가 존재하지 않을 경우에 입력한 영화 제목에 알맞은 영화 요소 컴포넌트 생성
    const moviesEl = this.el.querySelector(".movies");

    moviesEl?.append(
      ...movieStore.state.movies.map((movie) => {
        return new MovieItem({ movie }).el;
      })
    );

    const loaderEl = this.el.querySelector(".spinning-loader");
    movieStore.state.loading ? loaderEl?.classList.remove("hide") : loaderEl?.classList.add("hide");
  }
}
