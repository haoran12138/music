import axios from 'axios';

const HOST = 'http://47.104.88.123:3000/';

export function getSong(id) {
  const url = HOST + `/music/url?id=${id}`;

  return axios.get(url);
}

export function getLyric(id) {
  const url = HOST + `/lyric?id=${id}`;

  return axios.get(url);
}
