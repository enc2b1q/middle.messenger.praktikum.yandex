// import tpl from './signInTpl';
import './signIn.scss';
import renderDOM from "../utils/renderDOM";
import layoutEmpty from "../layout/empty";
import layoutLogin from "../layout/login";
import link from "../components/link";
import button from "../components/button";
import inputBox from "../components/inputBox";



const _inputBoxEmail = new inputBox(
    "div",
    {
        name: "email",
        labelText: "Почта",
        type: "email",

        attr: {
            class : "inputBox",
        }
    }
);
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
const _inputBoxFirstName = new inputBox(
    "div",
    {
        name: "first_name",
        labelText: "Имя",
        type: "text",

        attr: {
            class : "inputBox",
        }
    }
);
const _inputBoxSecondName = new inputBox(
    "div",
    {
        name: "second_name",
        labelText: "Фамилия",
        type: "text",

        attr: {
            class : "inputBox",
        }
    }
);
const _inputBoxPhone = new inputBox(
    "div",
    {
        name: "phone",
        labelText: "Телефон",
        type: "tel",

        attr: {
            class : "inputBox",
        }
    }
);
const _inputBoxPassword = new inputBox(
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
const _inputBoxPasswordRepeat = new inputBox(
    "div",
    {
        name: "password_repeat",
        labelText: "Пароль (ещё раз)",
        type: "password",

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
        events: {
            click: (e: Event) => {
                const target = e.target;
                if(!target) {
                    return;
                }
                window.location.assign(window.location.href + "#");
                e.preventDefault();
                e.stopPropagation();
            }
        },

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

const _content = new layoutLogin(
    "article",
    {
        loginHeader: "Регистрация",
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
