class Api {
    constructor(setting) {
        this._url = setting.url;
        this._headers = setting.headers;
    }

    //метод проверки результата запроса к серверу
    _checkResponse(res) {
        try {
            if (res.status === 200 || res.status === 201) {
                return res.json();
            }
        } catch (error) {
            return (error)
        }
    }

    //регистрация
    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email: email, password: password })
        })
            .then(this._checkResponse)
    };

    //аутентификация
    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
            .then(this._checkResponse)
    };

    //проверка токена
    getContent(token) {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: { ...this.headers, 'Authorization': `Bearer ${token}` }
        })
            .then(this._checkResponse)
    }

}

const auth = new Api({
    url: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json",
    }
})

export default auth