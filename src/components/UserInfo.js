export class UserInfo {
    constructor({ name, about }) {
        this._currentName = document.querySelector(name)
        this._currentAbout = document.querySelector(about)
    }
    getUserInfo() {
        this._userInfo = {}
        this._userInfo.name = this._currentName
        this._userInfo.about = this._currentAbout
        return this._userInfo
    }
    setUserInfo({ name, about }) {
        this._currentName.textContent = name
        this._currentAbout.textContent = about
    }
}