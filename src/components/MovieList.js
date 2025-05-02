import { Component } from "../core";
import movieStore from "../store/movie";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();

    movieStore.subscribe("movies", () => {
      this.render();
    });
  }

  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
      <div class="movies"></div>
    `;

    // 입력한 영화 제목에 알맞은 영화 요소 컴포넌트 생성
    const moviesEl = this.el.querySelector(".movies");
    moviesEl.append(
      ...movieStore.state.movies.map((movie) => {
        return new MovieItem({ movie }).el;
      })
    );
  }
}
