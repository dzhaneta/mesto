export default class UserInfo {
  constructor({ usernameSelector, aboutSelector }) {
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
    this._profileName.textContent = inputValues['username'];
    this._profileAbout.textContent = inputValues['user-about'];
  }

}
