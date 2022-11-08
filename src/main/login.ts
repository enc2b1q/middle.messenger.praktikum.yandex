import "./login.scss";
// import "../modules/scss/_validationInput.scss"
import renderDOM from "../utils/renderDOM";
import layoutEmpty from "../layout/empty";
import layoutLogin from "../layout/login";
import inputBox, {getNewInput} from "../components/inputBox";
import button from "../components/button";
import link from "../components/link";
import * as validator from "../utils/processFormData";
import formLogin from "../components/formLogin";
import {validationSubmitHandler} from "../utils/processFormData";

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
const _inputPwd = getNewInput(validator.password, "password");
const _inputBoxPwd = new inputBox(
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

const _buttonEnter = new button(
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

const _linkRegister = new link(
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

const _formLogin = new formLogin(
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

const _content = new layoutLogin(
    "article",
    {
        loginHeader: "Вход",
        formLogin: _formLogin,

        attr: {
            class: "layout-login-box",
        }
    }
);

const _layoutEmpty = new layoutEmpty(
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
