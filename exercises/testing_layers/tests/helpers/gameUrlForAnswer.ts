export default function urlForGameWithAnswer(answer: string) {
  const encodedAnswer = btoa(answer);
  return encodeURI(`/games/${encodedAnswer}`);
}
