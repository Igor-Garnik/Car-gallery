import utils from './utils.js';

import GalleryModel from './gallery/gallery.model.js';
import GalleryView from './gallery/gallery.view.js';
import GalleryController from './gallery/gallery.controller.js';

import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';
import LoginController from './login/login.controller.js';

import ProfileModel from './profile/profile.model.js';
import ProfileView from './profile/profile.view.js';
import ProfileController from './profile/profile.controller.js'

let wraper = document.querySelector("#wrapper");

let routeConfig = {
    "" : () => {
        utils.initTemplate(wrapper, "login-view");
        let model = new LoginModel();
        let view = new LoginView();
        let controller = new LoginController(model, view, utils);
    }, 
    "gallery" : () => {
  /*       utils.initTemplate(wrapper, "gallery-view"); */
        let model = new GalleryModel;
        let view = new GalleryView;
        let observer = new Observer;
        new GalleryController(model, view, observer, utils);
    },
    "profile" : () => {
    /*     utils.initTemplate(wrapper, "profile-view"); */
        let model = new ProfileModel;
        let view = new ProfileView;
        new ProfileController(model, view, utils);
    }
}

function activateRoute(routeName){
    let route = routeConfig[routeName];
    route && route();    
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
    if(routeName) {
        utils.navigateTo(routeName); 
        activateRoute(routeName);
    } else {
        activateRoute(routeName);
    }
}