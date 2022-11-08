import './profileEditPerson.scss';
import renderDOM from "../utils/renderDOM";
import LayoutSideBar from "../layout/sideBar";
import BackArrowBtn from "../components/backArrowBtn";
import LayoutProfileParamsBox from "../layout/profileParamsBox";
import BoxProfileImage from "../modules/boxProfileImage";
import BoxProfilePersonEditBtn from "../modules/boxProfilePersonEditBtn";
import {boxProfilePersonEditBtnSaveBts as _boxProfilePersonEditBtnSaveBts} from "../components/button";
import ProfileParamBox, {getNewProfileParamInput} from "../components/profileParamBox";
import * as validator from "../utils/processFormData";
import FormProfile from "../components/formProfile";


const _sideBar = new BackArrowBtn(
    "div",
    {
        url: "/profile.html",

        attr: {
            class: "backArrowBtn-parentBox",
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

const _inputProfileEmail = getNewProfileParamInput({
    validatorPropName: validator.email
});
const _profileParamBoxEmail = new ProfileParamBox(
    "div",
    {
        name: "email",
        labelText: "Почта",
        // type: "email",
        // readonly : "",
        input: _inputProfileEmail,

        attr: {
            class: "profileParamBox",
        }
    }
);
const _inputProfileLogin = getNewProfileParamInput({
    validatorPropName: validator.login,
});
const _profileParamBoxLogin = new ProfileParamBox(
    "div",
    {
        name: "login",
        labelText: "Логин",
        // type: "text",
        // readonly : "",
        input: _inputProfileLogin,

        attr: {
            class: "profileParamBox",
        }
    }
);
const _inputProfileFirstName = getNewProfileParamInput({
    validatorPropName: validator.first_name,
});
const _profileParamBoxFirstName = new ProfileParamBox(
    "div",
    {
        name: "first_name",
        labelText: "Имя",
        // type: "text",
        // readonly : "",
        input: _inputProfileFirstName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileSecondName = getNewProfileParamInput({
    validatorPropName: validator.second_name,
});
const _profileParamBoxSecondName = new ProfileParamBox(
    "div",
    {
        name: "second_name",
        labelText: "Фамилия",
        // type: "text",
        // readonly : "",
        input: _inputProfileSecondName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileDisplayName = getNewProfileParamInput({
    validatorPropName: validator.display_name,
});
const _profileParamBoxDisplayName = new ProfileParamBox(
    "div",
    {
        name: "display_name",
        labelText: "Имя в чате",
        // type: "text",
        // readonly : "",
        input: _inputProfileDisplayName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfilePhone = getNewProfileParamInput({
    validatorPropName: validator.phone,
});
const _profileParamBoxPhone = new ProfileParamBox(
    "div",
    {
        name: "phone",
        labelText: "Телефон",
        // type: "tel",
        // readonly : "",
        input: _inputProfilePhone,

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

const _formProfile = new FormProfile(
    "form",
    {
        profileParams_params_box: [
            _profileParamBoxEmail,
            _profileParamBoxLogin,
            _profileParamBoxFirstName,
            _profileParamBoxSecondName,
            _profileParamBoxDisplayName,
            _profileParamBoxPhone
        ],
        profileParams_buttons_box: _profileParams_buttons_box,

        attr: {
            class: "layout_profileParams_form",
            id: "form",
            action: "#",
            method: "POST",
        },

        // events: {
        //     submit: (e: Event) => {
        //         console.log("submit:")
        //         const target = e.target as HTMLFormElement;
        //         if(!target) {
        //             return;
        //         }
        //         e.preventDefault();
        //         processFormData();
        //     },
        // },
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


// import pageProfileEditPerson from '../pages/pageProfileEditPerson'
//
// const props = {
// };
// document.getElementById('root').innerHTML = tpl(props);
