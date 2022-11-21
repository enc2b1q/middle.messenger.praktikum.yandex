import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import ErrorBox from "../../components/errorBox";
import PageError from "../pageError";
import LayoutEmpty from "../../layout/empty";

import {_linkBackToChatInst as _link} from "../../components/link";


const _errorBox = new ErrorBox(
    "section",
    {
        number: '404',
        text: 'Не туда попали',
        link: _link,
        attr: {
            class: 'errorBox',
            id: "errorBoxId",
        }
    }
);

const _content = new PageError(
    "article",
    {
        errorBox: _errorBox,
        attr: {
            class: 'page-box',
        }
    }
);

const _layoutEmpty = new LayoutEmpty(
    "div",
    {
        content: _content,
        attr: {
            class: 'content',
        }
    }
);

export default class PageError404 extends Block {
    constructor() {
        super("div", {
            content: _layoutEmpty,
            attr: {
                class: "mainContent",
            }
        });
    }

    render() {
        console.log('PageError404 render');
        return this.compile(tpl);
    }
}