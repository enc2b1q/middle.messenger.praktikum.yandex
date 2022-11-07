import './profileChangePwd.scss';
import renderDOM from "../utils/renderDOM";
import layoutSideBar from "../layout/sideBar";
import backArrowBtn from "../components/backArrowBtn";
import layoutProfileParamsBox from "../layout/profileParamsBox";
import boxProfileImage from "../modules/boxProfileImage";
import boxProfilePersonEditBtn from "../modules/boxProfilePersonEditBtn";
import {boxProfilePersonEditBtnSaveBts as _boxProfilePersonEditBtnSaveBts} from "../components/button";
import profileParamBox, {getNewProfileParamInput} from "../components/profileParamBox";
import * as validator from "../utils/processFormData";
import processFormData from "../utils/processFormData";

const _inputProfileOldPassword = getNewProfileParamInput({
    validatorPropName: validator.oldPassword,
    type: "password",
});
const _profileParamBoxOldPassword = new profileParamBox(
    "div",
    {
        name: "oldPassword",
        labelText: "Старый пароль",
        // type: "password",
        // readonly : "",
        input: _inputProfileOldPassword,

        attr: {
            class: "profileParamBox",
        }
    }
);
const _inputProfileNewPassword = getNewProfileParamInput({
    validatorPropName: validator.newPassword,
    type: "password",
});
const _profileParamBoxNewPassword = new profileParamBox(
    "div",
    {
        name: "newPassword",
        labelText: "Новый пароль",
        // type: "password",
        // readonly : "",
        input: _inputProfileNewPassword,

        attr: {
            class: "profileParamBox",
        }
    }
);
const _inputProfileNewPasswordRepeat = getNewProfileParamInput({
    validatorPropName: validator.password_repeat,
    type: "password",
});
const _profileParamBoxNewPasswordRepeat = new profileParamBox(
    "div",
    {
        name: validator.password_repeat, //"newPasswordRepeat",
        labelText: "Повторите новый пароль",
        // type: "password",
        // readonly : "",
        input: _inputProfileNewPasswordRepeat,

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

        events: {
            submit: (e: Event) => {
                const target = e.target as HTMLInputElement;
                if(!target) {
                    return;
                }
                e.preventDefault();
                processFormData();
            },
        },

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
