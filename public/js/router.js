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
let carsList = "https://gist.githubusercontent.com/Igor-Garnik/039b4127b4fea9eddf1b8760a1cbc3d4/raw/ec523567eaa1eaf0fa57c98dca1f8511b01bc1db/cars-list";
let usersLisr = "https://gist.githubusercontent.com/Igor-Garnik/7bcff581fb9f75cd21b6a5653a626ce6/raw/6439cf4ca5f8f3136be569716dbe422c4595a4b5/users-list";

let routeConfig = {
    "" : () => {
        utils.initTemplate(wrapper, "login-view");
        let model = new LoginModel(usersLisr);
        let view = new LoginView;
        let controller = new LoginController(model, view, utils);
    }, 
    "gallery" : () => {
        utils.initTemplate(wrapper, "gallery-view");
        let model = new GalleryModel(carsList);
        let view = new GalleryView;
        let observer = new Observer;
        new GalleryController(model, view, observer, utils);
    },
    "profile" : () => {
        utils.initTemplate(wrapper, "profile-view");
        let model = new ProfileModel(usersList);
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