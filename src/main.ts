import App from "./App";
import router from "./routes";

const root = document.querySelector("#root");

// 옵셔널 체이닝(Optional Chaining) 문법을 통해 undefined 또는 null이 아닐 경우 뒤의 메서드를 실행시킨다.
root?.appendChild(new App().el);

router();
