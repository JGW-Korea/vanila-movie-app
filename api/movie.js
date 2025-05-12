import fetch from "node-fetch";

const { OMDb_API_KEY } = process.env;

// Vercel 서버리스 함수(Serverless Functions)
// -> 서버리스 함수는 브라우저 환경이 아닌 Node.js 실행 환경에서 실행된다.
// -> 이로 인해, Node.js 에서는 Fetch API를 제공하지 않기 때문에 node-fetch 패키지를 설치해야 한다.
export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body);

  const url = id
    ? `https://omdbapi.com?apikey=${OMDb_API_KEY}&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=${OMDb_API_KEY}&s=${title}&page=${page}`;

  const res = await fetch(url);
  const json = await res.json();

  response.status(200).json(json);
}
