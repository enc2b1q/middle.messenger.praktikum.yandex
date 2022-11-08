// import tpl from './signInTpl';
import './signIn.scss';
// import "../modules/scss/_validationInput.scss"
import renderDOM from "../utils/renderDOM";
import layoutEmpty from "../layout/empty";
import layoutLogin from "../layout/login";
import link from "../components/link";
import button from "../components/button";
import inputBox, {getNewInput} from "../components/inputBox";
import * as validator from "../utils/processFormData";
import formLogin from "../components/formLogin";
import {validationSubmitHandler} from "../utils/processFormData";

const _inputEmail = getNewInput(validator.email);
const _inputBoxEmail = new inputBox(
    "div",
    {
        name: "email",
        labelText: "Почта",
        // type: "email",
        input: _inputEmail,

        attr: {
            class : "inputBox",
        }
    }
);
const _inputLogin = getNewInput(validator.login);
const _inputBoxLogin = new inputBox(
    "div",
    {
        name: "login",
        labelText: "Логин",
        input: _inputLogin,

        attr: {
            class : "inputBox",
        }
    }
);
const _inputFirstName= getNewInput(validator.first_name);
const _inputBoxFirstName = new inputBox(
    "div",
    {
        name: "first_name",
        labelText: "Имя",
        input: _inputFirstName,

        attr: {
            class : "inputBox",
        }
    }
);
const _inputSecondName= getNewInput(validator.second_name);
const _inputBoxSecondName = new inputBox(
    "div",
    {
        name: "second_name",
        labelText: "Фамилия",
        input: _inputSecondName,

        attr: {
            class : "inputBox",
        }
    }
);
const _inputPhone= getNewInput(validator.phone);
const _inputBoxPhone = new inputBox(
    "div",
    {
        name: "phone",
        labelText: "Телефон",
        // type: "tel",
        input: _inputPhone,

        attr: {
            class : "inputBox",
        }
    }
);
const _inputPwd = getNewInput(validator.password, "password");
const _inputBoxPassword = new inputBox(
    "div",
    {
        name: "password",
        labelText: "Пароль",
        // type: "password",
        input: _inputPwd,

        attr: {
            class : "inputBox",
        }
    }
);
const _inputPwdRepeat = getNewInput(validator.password_repeat, "password");
const _inputBoxPasswordRepeat = new inputBox(
    "div",
    {
        name: "password_repeat",
        labelText: "Пароль (ещё раз)",
        // type: "password",
        input: _inputPwdRepeat,

        attr: {
            class : "inputBox",
        }
    }
);


const _buttonRegister = new button(
    "button",
    {
        text: "Зарегистрироваться",
        attr: {
            id: "btnRegisterId",
            type: "submit",
            class : "button",
        },
        // events: {
        //     click: (e: Event) => {
        //         const target = e.target;
        //         if(!target) {
        //             return;
        //         }
        //         // window.location.assign(window.location.href + "#");
        //         e.preventDefault();
        //         e.stopPropagation();
        //         processFormData();
        //     },
        // },

    }
);

const _linkEnter = new link(
    "nav",
    {
        url: "/login.html",
        text: "Войти",
        attr: {
            class: "link",
            id: "lnkEnterId",
        }
    }
);

const _formLogin = new formLogin(
    "form",
    {
        loginBody: [
            _inputBoxEmail,
            _inputBoxLogin,
            _inputBoxFirstName,
            _inputBoxSecondName,
            _inputBoxPhone,
            _inputBoxPassword,
            _inputBoxPasswordRepeat
        ],
        loginBtns: [
            _buttonRegister,
            _linkEnter
        ],

        attr: {
            class: "layout-login-form",
            id: "form",
            action: "#",
            method: "POST",
        }
    }
);

const _content = new layoutLogin(
    "article",
    {
        loginHeader: "Регистрация",
        formLogin: _formLogin,

        events: {
            submit: validationSubmitHandler,
        },

        attr: {
            class: "layout-login-box"
        }
    }
);

const _layoutEmpty = new layoutEmpty(
    "div",
    {
        content: _content,
        attr: {
            class: "content"
        }
    }
);


renderDOM("#root", _layoutEmpty);


// import layoutEmpty from '../layout/empty'
// import pageRegister from '../pages/pageRegister';
//
// const props = {
// };
// document.getElementById('root').innerHTML = tpl(props);
