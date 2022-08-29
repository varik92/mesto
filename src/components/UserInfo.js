export class UserInfo {
    constructor({ name, about, avatar }) {
        this._currentName = document.querySelector(name)
        this._currentAbout = document.querySelector(about)
        this._currentAvatar = document.querySelector(avatar)
    }
    getUserInfo() {
        this._userInfo = {}
        this._userInfo.name = this._currentName.textContent
        this._userInfo.about = this._currentAbout.textContent

        return this._userInfo
    }

    setUserInfo({ name, about }) {
        this._currentName.textContent = name
        this._currentAbout.textContent = about
    }
    setUserAvatar({ avatar }) {
        this._currentAvatar.src = avatar
    }
}