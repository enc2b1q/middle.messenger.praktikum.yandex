// import tpl from './signInTpl';
import './signIn.scss';
// import "../modules/scss/_validationInput.scss"
import renderDOM from "../utils/renderDOM";
import LayoutEmpty from "../layout/empty";
import LayoutLogin from "../layout/login";
import Link from "../components/link";
import Button from "../components/button";
import InputBox, {getNewInput} from "../components/inputBox";
import * as validator from "../utils/processFormData";
import FormLogin from "../components/formLogin";
import {validationSubmitHandler} from "../utils/processFormData";

const _inputEmail = getNewInput(validator.email);
const _inputBoxEmail = new InputBox(
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
const _inputBoxLogin = new InputBox(
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
const _inputBoxFirstName = new InputBox(
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
const _inputBoxSecondName = new InputBox(
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
const _inputBoxPhone = new InputBox(
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
const _inputBoxPassword = new InputBox(
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
const _inputBoxPasswordRepeat = new InputBox(
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


const _buttonRegister = new Button(
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

const _linkEnter = new Link(
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

const _formLogin = new FormLogin(
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

const _content = new LayoutLogin(
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

const _layoutEmpty = new LayoutEmpty(
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
