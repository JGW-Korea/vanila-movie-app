import { Component } from "../core";
import { SimpleMovie } from "../store/movie";

interface Props {
  [key: string]: unknown;
  movie: SimpleMovie;
}

// 단일 영화 카드 컴포넌트
export default class MovieItem extends Component {
  public props!: Props;

  constructor(props: Props) {
    super({
      tagName: "a",
      props,
    });
  }

  render() {
    const { movie } = this.props;

    // 컴포넌트 HTML 속성 설정
    this.el.setAttribute("href", `#/movie?id=${movie.imdbID}`);
    this.el.classList.add("movie");
    this.el.style.backgroundImage = `url(${movie.Poster})`;

    // 컴포넌트 자식 요소 구성
    this.el.innerHTML = /* html */ `
      <div class="info">
        <div class="year">${movie.Year}</div>
        <div class="title">${movie.Title}</div>
      </div>
    `;
  }
}
