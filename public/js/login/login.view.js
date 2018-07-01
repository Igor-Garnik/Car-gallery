export default class LoginView {
    constructor() {
        this.domElements = {
            "logInBtn": document.querySelector("#log-in-btn"),
            "logOutBtn": document.querySelector("#log-out-btn"),
            "login": document.querySelector("#inputEmail"),
            "password": document.querySelector("#inputPassword"),
            "navigationPanel": document.querySelector("#top-panel-navigation"),


            "showPasswordBtn": document.querySelector("#show-password"),
            "loginForm": document.querySelector("#login-form"),
            "alertWindow": document.querySelector(".alert-window"),
            "galleryWindow": document.querySelector(".gallery-window"),
            "userWindow": document.querySelector(".user-window"),
            "mainMenu": document.querySelector(".main-menu"),
            "inputPassword": document.querySelector("#otputPassword"),
            "inputEmail": document.querySelector("#otputEmail"),
            
        }
    }

    getCradentials() {
        return {
            login: this.domElements.login.value,
            password: this.domElements.password.value
        }
    }

    hideMsg() {
        this.domElements.alertWindow.classList.add("hide");
    }

    showNavigation() {
        this.domElements.navigationPanel.classList.remove("hide");
    }

    hideLogout() {
        this.domElements.navigationPanel.classList.add("hide");
    }
   
}