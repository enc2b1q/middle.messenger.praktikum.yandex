import './profileEditPerson.scss';
import renderDOM from "../utils/renderDOM";
import layoutSideBar from "../layout/sideBar";
import backArrowBtn from "../components/backArrowBtn";
import layoutProfileParamsBox from "../layout/profileParamsBox";
import boxProfileImage from "../modules/boxProfileImage";
import boxProfilePersonEditBtn from "../modules/boxProfilePersonEditBtn";
import {boxProfilePersonEditBtnSaveBts as _boxProfilePersonEditBtnSaveBts} from "../components/button";
import profileParamBox from "../components/profileParamBox";


const _sideBar = new backArrowBtn(
    "div",
    {
        url: "/profile.html",

        attr: {
            class: "backArrowBtn-parentBox",
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


const _profileParamBoxEmail = new profileParamBox(
    "div",
    {
        name: "email",
        labelText: "Почта",
        type: "email",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);

const _profileParamBoxLogin = new profileParamBox(
    "div",
    {
        name: "login",
        labelText: "Логин",
        type: "text",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);

const _profileParamBoxFirstName = new profileParamBox(
    "div",
    {
        name: "first_name",
        labelText: "Имя",
        type: "text",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);

const _profileParamBoxSecondName = new profileParamBox(
    "div",
    {
        name: "second_name",
        labelText: "Фамилия",
        type: "text",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);

const _profileParamBoxDisplayName = new profileParamBox(
    "div",
    {
        name: "display_name",
        labelText: "Имя в чате",
        type: "text",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);

const _profileParamBoxPhone = new profileParamBox(
    "div",
    {
        name: "phone",
        labelText: "Телефон",
        type: "tel",
        // readonly : "",

        attr: {
            class: "profileParamBox",
        }
    }
);

// const _boxProfilePersonEditBtnSaveBts = new button(
//     "button",
//     {
//         text: "Сохранить",
//         attr: {
//             id: "btnSaveId",
//             type: "submit",
//             class : "button",
//         },
//         events: {
//             click: (e: Event) => {
//                 const target = e.target;
//                 if(!target) {
//                     return;
//                 }
//                 window.location.assign(window.location.href + "#");
//                 e.preventDefault();
//                 e.stopPropagation();
//             }
//         },
//
//     }
// );

const _profileParams_buttons_box = new boxProfilePersonEditBtn(
    "div",
    {
        button: _boxProfilePersonEditBtnSaveBts,

        attr: {
            class: "profileBox_btn_personEdit_outerBox",
        }
    }
);

const _sideBarContent = new layoutProfileParamsBox(
    "div",
    {
        profileParams_image_box: _profileParams_image_box,
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


// import pageProfileEditPerson from '../pages/pageProfileEditPerson'
//
// const props = {
// };
// document.getElementById('root').innerHTML = tpl(props);
