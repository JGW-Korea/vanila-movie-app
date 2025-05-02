import { Store } from "../core";

// 영화 검색과 관련된 상태를 저장하는 전역 스토어
const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
  pageMax: 1,
});

export default store;

// 입력한 검색어와 페이지 번호를 기준으로 영화 정보 API 요청
export const searchMovies = async (page) => {
  store.state.page = page;

  // 새로운 검색어를 통해 영화를 검색할 경우 -> 초기화 (예외 처리)
  if (page === 1) {
    store.state.movies = [];
  }

  // 입력한 검색어에 맞는 영화 요청
  const res = await fetch(
    `http://www.omdbapi.com?apikey=${process.env.PARCEL_OMDb_API_KEY}&s=${store.state.searchText}&page=${page}`
  );
  const { Search, totalResults } = await res.json();

  // 영화 정보 누적
  store.state.movies = [...store.state.movies, ...Search];

  store.state.pageMax = Math.ceil(Number(totalResults) / 10); // 영화 최대 페이지 수
};
