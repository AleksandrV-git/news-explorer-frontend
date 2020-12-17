export class NewsApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.apiKey = options.apiKey;
    this.sortBy = options.sortBy;
    this.date = options.date;
  }

  getNews = (searchWord) => {
    console.log()
    return fetch(
      this.baseUrl +
      `/v2/everything?` +
      `q=${searchWord}&` +
      `from=${this.date}&` +
      `sortBy=${this.sortBy}&` +
      `apiKey=${this.apiKey}`
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }
}
