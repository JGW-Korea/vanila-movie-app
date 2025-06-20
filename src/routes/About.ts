import { Component } from "../core";
import aboutStore from "../store/about";

// About Route
export default class About extends Component {
  render() {
    const { photo, name, email, blog, github } = aboutStore.state; // 전역 저장소에 저장된 사용자 정보를 가져온다.

    // About 라우트 화면 구성
    this.el.classList.add("container", "about");
    this.el.innerHTML = /* html */ `
      <div style="background-image: url(${photo});" class="photo"></div>
      <p class="name">${name}</p>
      <p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_black">${email}</a></p>
      <p><a href="${github}" target="_black">GitHub</a></p>
      <p><a href="${blog}" target="_black">Blog</a></p>
    `;
  }
}
