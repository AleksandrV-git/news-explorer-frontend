export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getUserProfile = () => {

        return fetch(this.baseUrl + "/users/me", { headers: this.headers })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }



    getInitialCards = () => {

        return fetch(this.baseUrl + "/cards", { headers: this.headers })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    patchUserProfile = (nameValue, aboutValue) => {

        return fetch(this.baseUrl + "/users/me", {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    postCard = (nameValue, linkValue) => {

        return fetch(this.baseUrl + "/cards", {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                link: linkValue
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    deleteCard = (id, removeHandler) => {

        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            return fetch(this.baseUrl + "/cards/" + id, {
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

    likeCard = (id) => {
        return fetch(this.baseUrl + "/cards/like/" + id, {
            method: 'PUT',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }

    likeCardRemove = (id) => {
        return fetch(this.baseUrl + "/cards/like/" + id, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    patchUserAvatar = (avatarLink) => {

        return fetch(this.baseUrl + "/users/me/avatar", {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarLink,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }
}