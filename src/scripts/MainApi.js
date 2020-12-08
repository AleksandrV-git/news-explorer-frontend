export class MainApi {
  constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
  }
signup = ({name, email, password}) => {

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
signin = ({email, password}) => {

    return fetch(this.baseUrl + "/signin", {
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
                return res.json();
            }
            return Promise.reject(res.status);
        })
}

getUserData = () => {

      return fetch(this.baseUrl + "/users/me", { headers: this.headers })

          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(res.status);
          })
  }



getArticles = () => {

      return fetch(this.baseUrl + "/articles", { headers: this.headers })

          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(res.status);
          })
  }

createArticle = ({keyword, title, text, date, source, link, image}) => {

      return fetch(this.baseUrl + "/articles", {
          method: 'POST',
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

  removeArticle = (id, removeHandler) => {

      if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
          return fetch(this.baseUrl + "/articles/" + id, {
              method: 'DELETE',
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
