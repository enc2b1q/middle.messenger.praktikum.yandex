import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import InputBox, {getNewInput} from "../../components/inputBox";
import * as validator from "../../utils/processFormData";
import Button from "../../components/button";
import Link from "../../components/link";
import FormLogin from "../../components/formLogin";
import LayoutLogin from "../../layout/login";
import LayoutEmpty from "../../layout/empty";
import AuthController from "../../controllers/authController";
import BaseController from "../../controllers/baseController";
import Router from "../../services/router";


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
const _inputPwd = getNewInput(validator.propNames.password, "password");
const _inputBoxPwd = new InputBox(
    "div",
    {
        name: "password",
        labelText: "Пароль",
        input: _inputPwd,

        attr: {
            class: "inputBox",
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
            class: "button",
        },
    }
);

const _linkRegister = new Link(
    "nav",
    {
        url: "/sign-up.html",
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
            submit: AuthController.processUserLoginSubmit
            //     (e: SubmitEvent) => {
            //     e.preventDefault();
            //     const target = e.target as HTMLFormElement;
            //     if (!target) {
            //         return false;
            //     }
            //     const canSendDataToLogin = processFormData(target);
            //     if (canSendDataToLogin) {
            //         console.log('canSendDataToLogin');
            //         //get form data as object
            //         //send form data as object
            //     }
            //     else {
            //         console.log('can not SendDataToLogin');
            //     }
            //     // validationSubmitHandler(e);
            // }
            ,
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


export default class PageLogin extends Block {
    constructor() {
        super("div", {
            content: _layoutEmpty,
            attr: {
                class: "mainContent",
            }
        });
    }

    componentDidMount() {
        console.log('PageLogin componentDidMount');

        BaseController.testAuth()
            .then(
                (isAuth) => {
                    const router = new Router("#root");
                    if (isAuth) {
                        router.go("/messenger");
                    }//do not go to the main at else - this is main
                }
            );
    }

    render() {
        console.log('PageLogin render');
        return this.compile(tpl);
    }
}
