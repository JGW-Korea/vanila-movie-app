import { Component } from "../core";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });

    // 최대 페이지 도달 시 버튼 숨기기 처리
    movieStore.subscribe("pageMax", () => {
      const { page, pageMax } = movieStore.state;

      // 코드 단축 (성능 차이 없음)
      // page < pageMax ? this.el.classList.remove("hide") : this.el.classList.add("hide");
      if (page < pageMax) {
        this.el.classList.remove("hide");
      } else {
        this.el.classList.add("hide");
      }
    });
  }

  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View more...";

    this.el.addEventListener("click", async () => {
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
