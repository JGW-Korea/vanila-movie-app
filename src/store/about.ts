import { Store } from "../core";

interface AboutState {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

// 사용자 정보와 관련된 상태를 저장하는 전역 스토어
export default new Store<AboutState>({
  photo: "https://heropy.blog/css/images/logo.png",
  name: "Vito / JoGyeWon",
  email: "jgw6372@gmail.com",
  blog: "https://gyewon-tech-blog.super.site/",
  github: "https://github.com/JGW-Korea",
  repository: "https://github.com/JGW-Korea/vanila-movie-app",
});
