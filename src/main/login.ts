import "./login.scss";
import renderDOM from "../utils/renderDOM";
import layoutEmpty from "../layout/empty";
import layoutLogin from "../layout/login";
import inputBox from "../components/inputBox";
import button from "../components/button";
import link from "../components/link";
import processFormData from "../utils/processFormData";

const _inputBoxLogin = new inputBox(
    "div",
    {
        name: "login",
        labelText: "Логин",
        type: "text",

        attr: {
            class : "inputBox",
        }
    }
);

const _inputBoxPwd = new inputBox(
    "div",
    {
        name: "password",
        labelText: "Пароль",
        type: "password",

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
        events: {
            click: (e: Event) => {
                const target = e.target;
                if(!target) {
                    return;
                }
                // window.location.assign("/selectChat.html");
                e.preventDefault();
                e.stopPropagation();
                processFormData();
            },
            blur: (e: Event) => {
                const target = e.target;
                if(!target) {
                    return;
                }
                e.preventDefault();
                processFormData();
            },

        },

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

const _content = new layoutLogin(
    "article",
    {
        loginHeader: "Вход",
        loginBody: [
            _inputBoxLogin,
            _inputBoxPwd,
        ],
        loginBtns: [
            _buttonEnter,
            _linkRegister
        ],

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
