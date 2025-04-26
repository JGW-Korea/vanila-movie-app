import { Component } from "./core";

// App 컴포넌트 -> 고정 영역(Header...)과 전환 영역(Router-View)을 구성하는 레이아웃 컴포넌트
export default class App extends Component {
  render() {
    const routerView = document.createElement("router-view"); // 라우팅에 따라 전환될 영역 확보(router-view)

    // 고정 영역과 전환 영역을 조립하여 기본 레이아웃 구성
    this.el.append(routerView);
  }
}
