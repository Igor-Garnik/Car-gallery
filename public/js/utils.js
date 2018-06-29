export default class Utils {
    constructor (){}

    static initTemplate(wrapperEl, templateId) {
        let template = document.querySelector(`#${templateId}`);
        let clon = template.content.cloneNode(true);
        wrapperEl.innerHTML = '';
        wrapperEl.appendChild(clon);
    }

    static setActiveLink(elem,object) {
        object.forEach(item => {
            if(item == elem) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        })
    }

    static navigateTo(routeName) {
        window.location.hash= "#" + routeName;
    }

    static isLoggedIn() {
        let credentials = JSON.parse(localStorage.getItem('credentials'));
        return !!credentials;
    }

    static setLocalStorage (value, key) {
		localStorage.setItem(value, key);
	}

	static getLocalStorage (value) {
		return localStorage.getItem(value);
	}
}