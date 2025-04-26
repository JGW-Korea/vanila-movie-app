// 모든 컴포넌트의 기반이 되는 클래스 정의
export class Component {
  constructor(payload = {}) {
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
