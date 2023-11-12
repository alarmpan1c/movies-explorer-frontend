import { MOVIES_API } from "./constants";


class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status}`);
    }
  }
  _request(url, option) {
    return fetch(url, option).then(this._checkResponse);
  }

  getMovies() {
    return this._request(`${this._url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
