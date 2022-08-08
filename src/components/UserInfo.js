export default class UserInfo {
  constructor({ avatarSelector, usernameSelector, aboutSelector }) {
    this._profileAvatar = document.querySelector(avatarSelector);
    this._profileName = document.querySelector(usernameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name:   this._profileName.textContent,
      about:  this._profileAbout.textContent
    };
  }

  setUserInfo(inputValues) {
    if (inputValues['avatar']) {
      this._profileAvatar.src = inputValues['avatar'];
    }
    if (inputValues['name']) {
      this._profileName.textContent = inputValues['name'];
    }
    if (inputValues['about']) {
      this._profileAbout.textContent = inputValues['about'];
    }
  }

}
