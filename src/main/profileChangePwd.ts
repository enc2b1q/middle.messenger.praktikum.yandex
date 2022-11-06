import './profileChangePwd.scss';
import renderDOM from "../utils/renderDOM";
import layoutSideBar from "../layout/sideBar";
import backArrowBtn from "../components/backArrowBtn";
import layoutProfileParamsBox from "../layout/profileParamsBox";
import boxProfileImage from "../modules/boxProfileImage";
import boxProfilePersonEditBtn from "../modules/boxProfilePersonEditBtn";
import {boxProfilePersonEditBtnSaveBts as _boxProfilePersonEditBtnSaveBts} from "../components/button";
import profileParamBox from "../components/profileParamBox";


const _profileParamBoxOldPassword = new profileParamBox(
    "div",
    {
        name: "oldPassword",
        labelText: "Старый пароль",
        type: "password",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);
const _profileParamBoxNewPassword = new profileParamBox(
    "div",
    {
        name: "newPassword",
        labelText: "Новый пароль",
        type: "password",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);
const _profileParamBoxNewPasswordRepeat = new profileParamBox(
    "div",
    {
        name: "newPasswordRepeat",
        labelText: "Повторите новый пароль",
        type: "password",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);

const _profileParams_buttons_box = new boxProfilePersonEditBtn(
    "div",
    {
        button: _boxProfilePersonEditBtnSaveBts,

        attr: {
            class: "profileBox_btn_personEdit_outerBox",
        }
    }
);

const _profileParams_image_box = new boxProfileImage(
    "div",
    {
        username: "",

        attr: {
            class: "image-outerBox",
        }
    }
);

const _sideBarContent = new layoutProfileParamsBox(
    "div",
    {
        profileParams_image_box: _profileParams_image_box,
        profileParams_params_box: [
            _profileParamBoxOldPassword,
            _profileParamBoxNewPassword,
            _profileParamBoxNewPasswordRepeat
        ],
        profileParams_buttons_box: _profileParams_buttons_box,

        attr: {
            class: "layout_profileParams_outer_box",
        }
    }
);


const _sideBar = new backArrowBtn(
    "div",
    {
        url: "/profile.html",

        attr: {
            class: "backArrowBtn-parentBox",
        }
    }
);

const _layoutSideBar = new layoutSideBar(
    "div",
    {
        sideBar: _sideBar,
        sideBarContent: _sideBarContent,

        sizeClass: "sideBar-small",
        attr: {
            class: "container",
        }
    }
);

renderDOM("#root", _layoutSideBar);


// import pageProfileChangePwd from '../pages/pageProfileChangePwd'
//
// const props = {
// };
// document.getElementById('root').innerHTML = tpl(props);
