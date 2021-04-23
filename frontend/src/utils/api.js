class Api {
  constructor({address, groupId, token}) {
    this._address = address;
    this._groupId = groupId;
    this._token = token;
  }

  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this.getResponse)
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this.getResponse)
  }

  setUserInfo({name, about}) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this.getResponse)
  }

  addCard({name, link}) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this.getResponse)
  }

  removeCard(cardId) {
    return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this.getResponse)
  }

  changeLikeStatus(cardId, like) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this.getResponse)
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(this.getResponse)
  }
}

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-19',
  token: '979f327c-b875-4f2f-925c-fd9cce3cb14f'
});

export default api;
