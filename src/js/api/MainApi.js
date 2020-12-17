export class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  signup = ({ name, email, password }) => {
    return fetch(this.baseUrl + "/signup", {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }
  signin = ({ email, password }) => {
    return fetch(this.baseUrl + "/signin", {
      credentials: "include",
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        console.log(res)
        if (res.ok) {
          return res;
        }
        return Promise.reject(res.status);
      })
  }
  getUserData = () => {
    return fetch(this.baseUrl + "/users/me", { credentials: 'include', headers: this.headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }
  getArticles = () => {
    return fetch(this.baseUrl + "/articles", { credentials: 'include',headers: this.headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }
  createArticle = ({ keyword, title, text, date, source, link, image }) => {
    return fetch(this.baseUrl + "/articles", {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }
  removeArticle = ({id}) => {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      return fetch(this.baseUrl + "/articles/" + id, {
        method: 'DELETE',
        credentials: 'include',
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
    }
  }
}
