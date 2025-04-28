import Headline from "../components/Headline";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import { Component } from "../core";

// Home Route
export default class Home extends Component {
  render() {
    const headeline = new Headline().el;
    const search = new Search().el;
    const movieList = new MovieList().el;

    this.el.classList.add("container");

    // 실제 화면에 노출되는 하위 컴포넌트 삽입
    this.el.append(headeline, search, movieList);
  }
}
