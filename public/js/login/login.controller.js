export default class LoginController {
    constructor(model, view, utils) {
        this.model = model;
        this.view = view;
        this.util = utils;
        this.init();
        this.tect = null;

    }

    init() {
        this.initListeners();
    }

    initListeners() {
        this.view.domElements.logInBtn.addEventListener('click', this.loginHandler.bind(this));
        this.view.domElements.logOutBtn.addEventListener('click', this.logOutHandler.bind(this))
    }

    loginHandler(e) {
        e.preventDefault();
        let credentials = this.view.getCredentials();
        if(this.model.validate(credentials)) {
            this.model.login(credentials).then(
                data => {
                    if(data.liginSatus) {
                        this.view.hideMsg();
                        this.view.showNavigation();
                        this.utils.navigateTo("gallery");
                    }
                }
            )
        }
    }

    logOutHandler() {
        this.view.hideNavigation();
        this.model.logOut();
        this.utils.navigateTo("");
    }

}