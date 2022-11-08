import './profile.scss';
import renderDOM from "../utils/renderDOM";
import layoutSideBar from "../layout/sideBar";
import backArrowBtn from "../components/backArrowBtn";
import layoutProfileParamsBox from "../layout/profileParamsBox";
import boxProfileImage from "../modules/boxProfileImage";
import profileParamBox, {getNewProfileParamInput} from "../components/profileParamBox";
import boxProfileBtnsEdit from "../modules/boxProfileBtnsEdit";
import profileLinkEdit from "../components/profileLinkEdit";
import * as validator from "../utils/processFormData";
import formProfile from "../components/formProfile";

const _sideBar = new backArrowBtn(
    "div",
    {
        url: "/selectChat.html",

        attr: {
            class: "backArrowBtn-parentBox",
        }
    }
);

const _profileParams_image_box = new boxProfileImage(
    "div",
    {
        username: "name",

        attr: {
            class: "image-outerBox",
        }
    }
);

const _inputProfileEmail = getNewProfileParamInput({
    validatorPropName: validator.email,
    readonly: "readonly"
});
const _profileParamBoxEmail = new profileParamBox(
    "div",
    {
        name: "email",
        labelText: "Почта",
        // type: "email",
        input: _inputProfileEmail,
        // readonly : "readonly='readonly'",

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileLogin = getNewProfileParamInput({
    validatorPropName: validator.login,
    readonly: "readonly"
});
const _profileParamBoxLogin = new profileParamBox(
    "div",
    {
        name: "login",
        labelText: "Логин",
        // type: "text",
        // readonly : "readonly='readonly'",
        input: _inputProfileLogin,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileFirstName = getNewProfileParamInput({
    validatorPropName: validator.first_name,
    readonly: "readonly"
});
const _profileParamBoxFirstName = new profileParamBox(
    "div",
    {
        name: "first_name",
        labelText: "Имя",
        // type: "text",
        // readonly : "readonly='readonly'",
        input: _inputProfileFirstName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileSecondName = getNewProfileParamInput({
    validatorPropName: validator.second_name,
    readonly: "readonly"
});
const _profileParamBoxSecondName = new profileParamBox(
    "div",
    {
        name: "second_name",
        labelText: "Фамилия",
        // type: "text",
        // readonly : "readonly='readonly'",
        input: _inputProfileSecondName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileDisplayName = getNewProfileParamInput({
    validatorPropName: validator.display_name,
    readonly: "readonly"
});
const _profileParamBoxDisplayName = new profileParamBox(
    "div",
    {
        name: "display_name",
        labelText: "Имя в чате",
        // type: "text",
        // readonly : "readonly='readonly'",
        input: _inputProfileDisplayName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfilePhone = getNewProfileParamInput({
    validatorPropName: validator.phone,
    readonly: "readonly"
});
const _profileParamBoxPhone = new profileParamBox(
    "div",
    {
        name: "phone",
        labelText: "Телефон",
        // type: "tel",
        // readonly : "readonly='readonly'",
        input: _inputProfilePhone,

        attr: {
            class: "profileParamBox",
        }
    }
);


const _profileLinkEditPersonEdit = new profileLinkEdit(
    "nav",
    {
        url: "/profileEditPerson.html",
        profileLinkEdit_color_class: "profileLinkEdit_a_blue",
        linkText: "Изменить данные",

        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_start",
        }
    }
);
const _profileLinkEditChangePwd = new profileLinkEdit(
    "nav",
    {
        url: "/profileChangePwd.html",
        profileLinkEdit_color_class: "profileLinkEdit_a_blue",
        linkText: "Изменить пароль",

        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_start",
        }
    }
);
const _profileLinkEditLogin = new profileLinkEdit(
    "nav",
    {
        url: "/login.html",
        profileLinkEdit_color_class: "profileLinkEdit_a_red",
        linkText: "Выйти",

        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_start",
        }
    }
);

const _profileParams_buttons_box = new boxProfileBtnsEdit(
    "div",
    {
        profileLinkEditArray: [
            _profileLinkEditPersonEdit,
            _profileLinkEditChangePwd,
            _profileLinkEditLogin
        ],

        attr: {
            class: "profileBox-btns-outerBox",
        }
    }
);

const _formProfile = new formProfile(
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

        events: {
            submit: (e: Event) => {
                e.preventDefault();
            },
        },
    }
);

const _sideBarContent = new layoutProfileParamsBox(
    "div",
    {
        profileParams_image_box: _profileParams_image_box,
        formProfile: _formProfile,

        attr: {
            class: "layout_profileParams_outer_box",
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

// import pageProfile from '../pages/pageProfile'
//
// const props = {
// };
// document.getElementById('root').innerHTML = tpl(props);
