class Api {
  private _url: string
  private _headers: any;
  constructor() {
    this._url = 'http://localhost:8000'
    // this._headers = config.headers
  }
  _checkResponse(res: any) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllPhotos() {
    return fetch(this._url + '/all-photos')
      .then(this._checkResponse)
  }

  getInnerSimilarPhotos(imageName: string) {
    return fetch(this._url + '/similar-photos/' + imageName)
      .then(this._checkResponse)
  }

}
const api = new Api()
export default api