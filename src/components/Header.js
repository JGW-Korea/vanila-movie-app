import { Component } from "../core";

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header",

      // 헤더의 네비게이터 메뉴를 상태 값을 이용한다.
      state: {
        menus: [
          { name: "Search", href: "#/" },
          { name: "Movie", href: "#/movie?id=tt0304141" },
          { name: "About", href: "#/about" },
        ],
      },
    });

    // 경로가 변경이 될 때마다 헤더의 active 효과가 바뀌기 위한 이벤트 핸들러 등록
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  render() {
    this.el.innerHTML = /* html */ `
      <a href="#/" class="logo"><span>OMDbAPI</span>.COM</a>
      <nav>
        <ul>
          <!-- 상태에 저장된 메뉴 목록을 기반으로 내비게이션 메뉴 항목 생성  -->
          ${this.state.menus
            .map((menu) => {
              const href = menu.href.split("?")[0]; // active 효과를 부여하기 위해 href 값을 ? 기준으로 분리 후 현재 주소 값을 가져온다.
              const hash = location.hash.split("?")[0]; // 현재 URL 경로
              const isActive = href === hash;

              return /* html */ `
              <li>
                <a href="${menu.href}" class="${isActive ? "active" : ""}">
                  ${menu.name}
                </a>
              </li>
            `;
            })
            .join("")}
        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src="https://heropy.blog/css/images/logo.png" alt="User" />
      </a>
    `;
  }
}
