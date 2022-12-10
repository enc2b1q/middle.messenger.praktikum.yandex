import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import ProfileParamBox, {getNewProfileParamInput} from "../../components/profileParamBox";
import * as validator from "../../utils/processFormData";
import BoxProfilePersonEditBtn from "../../modules/boxProfilePersonEditBtn";
import {boxProfilePersonEditBtnSaveBts as _boxProfilePersonEditBtnSaveBts} from "../../components/button";
import BoxProfileImage from "../../modules/boxProfileImage";
import FormProfile from "../../components/formProfile";
import LayoutProfileParamsBox from "../../layout/profileParamsBox";
import BackArrowBtn from "../../components/backArrowBtn";
import LayoutSideBar from "../../layout/sideBar";
import UserController from "../../controllers/userController";
import BaseController from "../../controllers/baseController";
import Router from "../../services/router";
import FormUploadImage from "../../components/formUploadImage";


const _inputProfileOldPassword = getNewProfileParamInput({
    validatorPropName: validator.propNames.oldPassword,
    type: "password",
});
const _profileParamBoxOldPassword = new ProfileParamBox(
    "div",
    {
        name: "oldPassword",
        labelText: "Старый пароль",
        input: _inputProfileOldPassword,

        attr: {
            class: "profileParamBox",
        }
    }
);
const _inputProfileNewPassword = getNewProfileParamInput({
    validatorPropName: validator.propNames.newPassword,
    type: "password",
});
const _profileParamBoxNewPassword = new ProfileParamBox(
    "div",
    {
        name: "newPassword",
        labelText: "Новый пароль",
        input: _inputProfileNewPassword,

        attr: {
            class: "profileParamBox",
        }
    }
);
const _inputProfileNewPasswordRepeat = getNewProfileParamInput({
    validatorPropName: validator.propNames.password_repeat,
    type: "password",
});
const _profileParamBoxNewPasswordRepeat = new ProfileParamBox(
    "div",
    {
        name: validator.propNames.password_repeat, //"newPasswordRepeat",
        labelText: "Повторите новый пароль",
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

const _uploadImageForm = new FormUploadImage(
    "form",
    {

        attr: {
            class: "uploadImageFrm",
            id: "uploadImageForm",
            action: "#",
            method: "POST",
            enctype: "multipart/form-data"
        },

        events: {
            submit: (e: Event) => {
                e.preventDefault();
            },
        },
    }
);

const _profileParams_image_box = new BoxProfileImage(
    "div",
    {
        uploadImageForm: _uploadImageForm,
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
            submit: UserController.processChangePasswordSubmit,
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
        url: "/settings.html",

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

export default class PageProfileChangePwd extends Block {
    constructor() {
        super("div", {
            content: _layoutSideBar,
            attr: {
                class: "mainContent",
            }
        });
    }

    componentDidMount() {
        console.log('PageProfileChangePwd componentDidMount');

        BaseController.testAuth()
            .then(
                (isAuth) => {
                    if (isAuth) {
                        UserController
                            .getUser()
                            .then(
                                (user) => {
                                    if (user) {
                                        this._updateUserData();
                                    }
                                }
                            )
                            .catch(BaseController.showMessage);
                    } else {
                        const router = new Router("#root");
                        router.go("/");
                    }
                }
            );

    }

    private _updateUserData() {
        UserController.updateUserImage(this);
    }

    render() {
        console.log('PageProfileChangePwd render');
        return this.compile(tpl);
    }
}
