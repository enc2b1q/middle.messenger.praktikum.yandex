import './profileChangePwd.scss';
import renderDOM from "../utils/renderDOM";
import LayoutSideBar from "../layout/sideBar";
import BackArrowBtn from "../components/backArrowBtn";
import LayoutProfileParamsBox from "../layout/profileParamsBox";
import BoxProfileImage from "../modules/boxProfileImage";
import BoxProfilePersonEditBtn from "../modules/boxProfilePersonEditBtn";
import {boxProfilePersonEditBtnSaveBts as _boxProfilePersonEditBtnSaveBts} from "../components/button";
import ProfileParamBox, {getNewProfileParamInput} from "../components/profileParamBox";
import * as validator from "../utils/processFormData";
import {validationSubmitHandler} from "../utils/processFormData";
import FormProfile from "../components/formProfile";

const _inputProfileOldPassword = getNewProfileParamInput({
    validatorPropName: validator.oldPassword,
    type: "password",
});
const _profileParamBoxOldPassword = new ProfileParamBox(
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
const _profileParamBoxNewPassword = new ProfileParamBox(
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
const _profileParamBoxNewPasswordRepeat = new ProfileParamBox(
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

const _profileParams_buttons_box = new BoxProfilePersonEditBtn(
    "div",
    {
        button: _boxProfilePersonEditBtnSaveBts,

        attr: {
            class: "profileBox_btn_personEdit_outerBox",
        }
    }
);

const _profileParams_image_box = new BoxProfileImage(
    "div",
    {
        username: "",

        attr: {
            class: "image-outerBox",
        }
    }
);

const _formProfile = new FormProfile(
    "form",
    {
        profileParams_params_box: [
            _profileParamBoxOldPassword,
            _profileParamBoxNewPassword,
            _profileParamBoxNewPasswordRepeat
        ],
        profileParams_buttons_box: _profileParams_buttons_box,

        attr: {
            class: "layout_profileParams_form",
            id: "form",
            action: "#",
            method: "POST",
        },

        events: {
            submit: validationSubmitHandler,
        },
    }
);

const _sideBarContent = new LayoutProfileParamsBox(
    "div",
    {
        profileParams_image_box: _profileParams_image_box,
        formProfile: _formProfile,

        attr: {
            class: "layout_profileParams_outer_box",
        }
    }
);


const _sideBar = new BackArrowBtn(
    "div",
    {
        url: "/profile.html",

        attr: {
            class: "backArrowBtn-parentBox",
        }
    }
);

const _layoutSideBar = new LayoutSideBar(
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
