import { Store } from "../core";

// 영화 검색과 관련된 상태를 저장하는 전역 스토어
const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {}, // 영화 상세 정보 상태 값
  loading: false,
  message: "Search for the movie title!",
});

export default store;

// 입력한 검색어와 페이지 번호를 기준으로 영화 정보 API 요청
export const searchMovies = async (page) => {
  store.state.page = page;
  store.state.loading = true; // 로딩 상태 활성화

  // 새로운 검색어를 통해 영화를 검색할 경우 -> 초기화 (예외 처리)
  if (page === 1) {
    store.state.movies = [];
    store.state.message = "";
  }

  try {
    // 입력한 검색어에 맞는 영화 요청
    const res = await fetch(
      `http://www.omdbapi.com?apikey=${process.env.PARCEL_OMDb_API_KEY}&s=${store.state.searchText}&page=${page}`
    );
    const { Search, totalResults, Response, Error } = await res.json();

    // 정상적으로 영화 데이터를 가져왔을 경우
    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search]; // 영화 정보 누적
      store.state.pageMax = Math.ceil(Number(totalResults) / 10); // 영화 최대 페이지 수
    }

    // 영화 데이터를 가져오지 못했을 경우
    else {
      store.state.message = Error;
    }
  } catch (error) {
    console.log("searchMovies error:", error);
  } finally {
    store.state.loading = false; // 로딩 상태 비활성화
  }
};

// 영화 상세 정보를 가져오는 API
export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(`http://www.omdbapi.com?apikey=${process.env.PARCEL_OMDb_API_KEY}&i=${id}`);
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails Error:", error);
  }
};
