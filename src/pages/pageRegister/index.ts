import tpl from './tpl';
import './style.scss';
import Block from "../../services/block";
import InputBox, {getNewInput} from "../../components/inputBox";
import * as validator from "../../utils/processFormData";
import Button from "../../components/button";
import Link from "../../components/link";
import FormLogin from "../../components/formLogin";
import LayoutLogin from "../../layout/login";
import LayoutEmpty from "../../layout/empty";
import BaseController from "../../controllers/baseController";
import Router from "../../services/router";
import AuthController from "../../controllers/authController";


const _inputEmail = getNewInput(validator.propNames.email);
const _inputBoxEmail = new InputBox(
    "div",
    {
        name: "email",
        labelText: "Почта",
        // type: "email",
        input: _inputEmail,

        attr: {
            class: "inputBox",
        }
    }
);
const _inputLogin = getNewInput(validator.propNames.login);
const _inputBoxLogin = new InputBox(
    "div",
    {
        name: "login",
        labelText: "Логин",
        input: _inputLogin,

        attr: {
            class: "inputBox",
        }
    }
);
const _inputFirstName = getNewInput(validator.propNames.first_name);
const _inputBoxFirstName = new InputBox(
    "div",
    {
        name: "first_name",
        labelText: "Имя",
        input: _inputFirstName,

        attr: {
            class: "inputBox",
        }
    }
);
const _inputSecondName = getNewInput(validator.propNames.second_name);
const _inputBoxSecondName = new InputBox(
    "div",
    {
        name: "second_name",
        labelText: "Фамилия",
        input: _inputSecondName,

        attr: {
            class: "inputBox",
        }
    }
);
const _inputPhone = getNewInput(validator.propNames.phone);
const _inputBoxPhone = new InputBox(
    "div",
    {
        name: "phone",
        labelText: "Телефон",
        // type: "tel",
        input: _inputPhone,

        attr: {
            class: "inputBox",
        }
    }
);
const _inputPwd = getNewInput(validator.propNames.password, "password");
const _inputBoxPassword = new InputBox(
    "div",
    {
        name: "password",
        labelText: "Пароль",
        // type: "password",
        input: _inputPwd,

        attr: {
            class: "inputBox",
        }
    }
);
const _inputPwdRepeat = getNewInput(validator.propNames.password_repeat, "password");
const _inputBoxPasswordRepeat = new InputBox(
    "div",
    {
        name: "password_repeat",
        labelText: "Пароль (ещё раз)",
        // type: "password",
        input: _inputPwdRepeat,

        attr: {
            class: "inputBox",
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
            class: "button",
        },
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

        events: {
            submit: AuthController.processUserSignupSubmit,
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
        loginHeader: "Регистрация",
        formLogin: _formLogin,

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

export default class PageRegister extends Block {
    constructor() {
        super("div", {
            content: _layoutEmpty,
            attr: {
                class: "mainContent",
            }
        });
    }

    componentDidMount() {
        console.log('PageRegister componentDidMount');

        BaseController.testAuth()
            .then(
                (isAuth) => {
                    if (isAuth) {
                        const router = new Router("#root");
                        router.go("/messenger");
                    }
                }// do not go to main - client want to register
            );
    }

    render() {
        console.log('PageRegister render');
        return this.compile(tpl);
    }
}
