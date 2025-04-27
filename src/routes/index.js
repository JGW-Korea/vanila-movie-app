import { createRouter } from "../core";
import Home from "./Home";

// createRouter 함수를 통해 경로(Path)와 해당 경로에서 렌더링할 컴포넌트를 정의
export default createRouter([{ path: "#/", component: Home }]);
