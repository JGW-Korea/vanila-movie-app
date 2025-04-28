import { Store } from "../core";

// 영화 정보 상태를 저장
const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
});

export default store;

// 입력한 검색어와 페이지 번호를 기준으로 영화 정보를 요청하는 API 함수
export const searchMovies = async (page) => {
  const res = await fetch(
    `http://www.omdbapi.com?apikey=${process.env.PARCEL_OMDb_API_KEY}&s=${store.state.searchText}&page=${page}`
  );
  const json = await res.json();
  console.log(json);
};
