// 모든 컴포넌트의 기반이 되는 클래스 정의
interface ComponentPayload {
  tagName?: string;
  state?: {
    [key: string]: unknown;
  };
  props?: {
    [key: string]: unknown;
  };
}

export class Component {
  public el;
  public state;
  public props;

  constructor(payload: ComponentPayload = {}) {
    const { tagName, state = {}, props = {} } = payload;

    this.el = document.createElement(tagName || "div"); // 지정된 태그 이름으로 DOM 요소 생성 (기본값: div)
    this.state = state; // 컴포넌트 내부에서 활용되는 상태 변수 (리렌더링 발생 X)
    this.props = props; // 컴포넌트 외부에서 전달되는 값

    // 초기 렌더링 수행
    this.render();
  }

  // 자식 컴포넌트에서 오버라이딩하여 개별 렌더링 로직을 수행
  render() {}
}

// 라우터(Router) 전환 처리 -> 렌더링 로직
function routerRender(routes) {
  // Hash Router가 아닌 경우 초기 경로를 "/#/"로 설정 (예외 처리)
  if (!location.hash) {
    history.replaceState("", null, "/#/");
  }

  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");

  // Query String 파싱 -> History State에 저장
  const query = queryString.split("&").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {});

  history.replaceState(query, ""); // 현재 히스토리 주소를 바꾸지 않고, 쿼리 스트링 값을 상태에 저장

  // 현재 경로에 맞는 라우트(Route) 찾기
  const currentRoute = routes.find((route) => new RegExp(`${route.path}/?$`).test(hash));

  // 라우터 뷰 초기화 후 해당 컴포넌트 렌더링
  routerView.innerHTML = ""; // 초기화 작업은 innerHTML로 진행해도 XSS 보안 위험 없음
  routerView.append(new currentRoute.component().el);

  // 페이지 전환 시 스크롤을 맨 위로 초기화
  window.scrollTo(0, 0);
}

// 라우터 도구 정의 -> 초기화 + 이벤트 등록
export function createRouter(routes) {
  return function () {
    // popstate 이벤트 감지 -> URL 변경 시 라우트 렌더링
    window.addEventListener("popstate", () => {
      routerRender(routes);
    });

    // 최초 페이지 로드 시 라우트 렌더링
    routerRender(routes);
  };
}

// 상태 관리(State Management) 클래스 정의
export class Store {
  constructor(state) {
    this.state = {}; // 외부 접근용 상태 객체
    this.observers = {}; // 상태 변경 시 실행될 콜백 목록

    // 상태를 key 단위로 감싸서 변경 감지 및 알림 처리
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (value) => {
          state[key] = value; // 내부 상태 업데이트

          // 호출할 콜백이 있는 경우!
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer) => observer(value));
          }
        },
      });
    }
  }

  // 상태 변경을 감지할 콜백 함수를 등록하는 메서드
  subscribe(key, cb) {
    Array.isArray(this.observers[key]) ? this.observers[key].push(cb) : (this.observers[key] = [cb]);
  }
}
