import { Component } from "../core";
import movieStore, { getMovieDetails } from "../store/movie";

// 영화 상세 페이지 라우트 컴포넌트
export default class Movie extends Component {
  async render() {
    this.el.classList.add("container", "the-movie");

    this.el.innerHTML = /* html */ `
      <div class="poster skeleton"></div>
      <div class="specs">
        <div class="title skeleton"></div>
        <div class="labels skeleton"></div>
        <div class="plot skeleton"></div>
      </div>
    `;

    await getMovieDetails(history.state.id); // 쿼리 스트링으로 보내진 id 값을 기준으로 영화 상세 정보 조회

    // 라우트 컴포넌트 요소 구성
    const { movie } = movieStore.state;
    this.el.innerHTML = /* html */ `
      <div class="poster" style="background-image: url(${movie.Poster.replace("SX300", "SX700")})"></div>
      <div class="specs">
        <div class="title">${movie.Title}</div>
        
        <!-- 영화 출시연도, 상영시간, 상영국가 -->
        <div class="labels">
          <span>${movie.Released}</span>
          &nbsp;/&nbsp;
          <span>${movie.Runtime}</span>
          &nbsp;/&nbsp;
          <span>${movie.Country}</span>
        </div>

        <!-- 영화 줄거리 -->
        <div class="plot">${movie.Plot}</div>

        <div>
          <h3>Ratings</h3>
          ${movie.Ratings.map((rating) => {
            return `<p>${rating.Source} - ${rating.Value}</p>`;
          }).join("")}
        </div>

        <div>
          <h3>Actors</h3>
          <p>${movie.Actors}</p>
        </div>

        <div>
          <h3>Director</h3>
          <p>${movie.Director}</p>
        </div>

        <div>
          <h3>Production</h3>
          <p>${movie.Production}</p>
        </div>

        <div>
          <h3>Genre</h3>
          <p>${movie.Genre}</p>
        </div>
      </div>
    `;
  }
}
