export default class LoginModel {
    constructor() {
        this.userUrl = 'https://gist.githubusercontent.com/Igor-Garnik/4393129d0e1985c5fb76d3d84a38a1db/raw/ae59f915950daa2e9d673db9534d2c4009cb9aa5/admin-user' 
        this.emailPattern =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        this.passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
        this.errorMsg = null;
        this.errorsMsgList = {
            "empty"     : 'Пожалуйста заполните поля логин и пароль',
            "logError"  : 'Логин введен неверно. Только латинские буквы.',
            "passError" : 'Пароль введен неверно. Тольк латинские буквы, цифры. Длина не менее 8 символов',
            "missmatch" : 'Неправильные логин или пароль.'
        };
    }

	validate(credentials) {
        return this.isEmpty(credentials)
        && this.isEmailMissmatchPattern(credentials)
        && this.isPasswordMissmatchPattern(credentials);
    }

    isEmpty(credentials) {
        return (credentials.login && credentials.password) || this.setErrorMsg("empty");
    }

    isEmailMissmatchPattern(credentials) {
        return this.emailPattern.test(cradentials.login) || this.setErrorMsg("logError");
    }

    isPasswordMissmatchPattern(credentials) {
        return this.passwordPattern.test(credentials.password) || this.setErrorMsg("passError")
    }

    setErrorMsg(key) {
        this.errorMsg = this.errorsMsgList[key];
        return false;
    }

    getErrorMsg(){
        return this.errorMsg;
    }

    login(credentials) {
        let options = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            method: 'post',
            body: JSON.stringify(credentials)
        };
        return fetch(this.userUrl, options)
            .then(responce => responce.json())
            .then(data => {
                if (data.loginStatus) {
                    localStorage.setItem('credentials', JSON.stringify(credentials));
                } else {
                    this.setErrorMsg("missmatch");
                }
                return data;
            });

    }

    logOut() {
        localStorage.removeItem('credentials');
    }

}