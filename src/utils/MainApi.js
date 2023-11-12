import { MAIN_API } from "../utils/constants";

class MainApi {
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

  getInfo(token) {
    return this._request(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  getSavedMovies(token) {
    return this._request(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  addLikeonServer(movie, token) {
    console.log(movie);
    const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        id,
      } = movie;
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `${image.formats.thumbnail.url}`,
        movieId: id
      })
    }).then((res) => {
      return res.json();
    });
  }
  deleteLikeonServer(_id, token) {
    console.log(_id, token);
    return this._request(`${this._url}/movies/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  editInfoOnServer(infoforServer, token) {
    console.log(infoforServer, token);
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: infoforServer.name,
        email: infoforServer.email,
      }),
    });
  }

  getResponseData(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText} ${res}`);
  }

  registration({password, email, name}) {
    console.log({password, email, name})
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
        name: name,
      }),
    }).then((res) => this.getResponseData(res));
  }

  authorization({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this.getResponseData(res));
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API,
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
