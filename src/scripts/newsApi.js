export class NewsApi {
  constructor(options) {
      this.baseUrl = options.baseUrl;
  }

  getNews = () => {

      return fetch(this.baseUrl + "/v2/top-headlines?country=us&apiKey=1093de14a32d4381b3b2bf485c9cbf25")

          .then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(res.status);
          })
  }
}
