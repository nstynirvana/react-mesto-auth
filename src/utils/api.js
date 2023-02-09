class Api {
    constructor(setting) {
        this._url = setting.url;
        this._headers = setting.headers;
    }

    // Проверяем результат запроса к серверу
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    //   Получаем все карточки
    getAllCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    // Получаем данные пользователя
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }
    // Редактируем данные пользователя
    editUserInfo(info) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(info)
        })
            .then(this._checkResponse)
    }
    // Добавляем новую карточку
    addNewCard(cardInfo) {
        console.log(cardInfo)
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardInfo)
        })
            .then(this._checkResponse)
    }

    //Удаляем карточку
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
    // Редактируем аватар
    editUserAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar/`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar })
        })
            .then(this._checkResponse)
    }
    // Ставим лайк
    setCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
    // Удаляем лайк
    deleteCardLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '58ae7d86-db08-4fdd-a462-6ce6f2e559b5',
        'content-type': 'application/json'
    }
});

export default api;
