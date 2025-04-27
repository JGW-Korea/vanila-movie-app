import App from "./App";
import router from "./routes";

const root = document.querySelector("#root");
root.appendChild(new App().el);

router();
