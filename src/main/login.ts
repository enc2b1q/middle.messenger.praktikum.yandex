import "./login.scss";
// import "../modules/scss/_validationInput.scss"
import renderDOM from "../utils/renderDOM";
import LayoutEmpty from "../layout/empty";
import LayoutLogin from "../layout/login";
import InputBox, {getNewInput} from "../components/inputBox";
import Button from "../components/button";
import Link from "../components/link";
import * as validator from "../utils/processFormData";
import FormLogin from "../components/formLogin";
import {validationSubmitHandler} from "../utils/processFormData";

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
const _inputPwd = getNewInput(validator.password, "password");
const _inputBoxPwd = new InputBox(
    "div",
    {
        name: "password",
        labelText: "Пароль",
        input: _inputPwd,

        attr: {
            class : "inputBox",
        }
    }
);

const _buttonEnter = new Button(
    "button",
    {
        text: "Войти",
        attr: {
            id: "btnEnterId",
            type: "submit",
            class : "button",
        },
        // events: {
        //     click: (e: Event) => {
        //         const target = e.target;
        //         if(!target) {
        //             return;
        //         }
        //         // window.location.assign("/selectChat.html");
        //         e.preventDefault();
        //         e.stopPropagation();
        //         processFormData();
        //     },
        // },

    }
);

const _linkRegister = new Link(
    "nav",
    {
        url: "/signIn.html",
        text: "Нет аккаунта?",
        attr: {
            class: "link",
            id: "lnkRegId",
        }
    }
);

const _formLogin = new FormLogin(
    "form",
    {
        loginBody: [
            _inputBoxLogin,
            _inputBoxPwd,
        ],
        loginBtns: [
            _buttonEnter,
            _linkRegister
        ],
        events: {
            submit: validationSubmitHandler,
        },
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
        loginHeader: "Вход",
        formLogin: _formLogin,

        attr: {
            class: "layout-login-box",
        }
    }
);

const _layoutEmpty = new LayoutEmpty(
    "div",
    {
        content: _content,
        attr: {
            class: "content",
        }
    }
);


renderDOM("#root", _layoutEmpty);

// import layoutEmpty from "../layout/empty"
// import pageEnter from "../pages/pageEnter";
//
// const props = {
// };
// document.getElementById("root").innerHTML = tpl(props);
