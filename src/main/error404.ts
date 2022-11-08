import renderDOM from "../utils/renderDOM";
// import tpl from './error404Tpl';
import './error404.scss';
import PageError from '../pages/pageError';
import LayoutEmpty from "../layout/empty";
import ErrorBox from "../components/errorBox";
import {_linkBackToChatInst as _link} from "../components/link";


const _errorBox = new ErrorBox(
    "section",
    {
        number: '404',
        text: 'Не туда попали',
        link: _link,
        attr: {
            class : 'errorBox',
            id: "errorBoxId",
        }
    }
);

const _content = new PageError(
    "article",
    {
        errorBox: _errorBox,
        attr: {
            class : 'page-box',
        }
    }
);

const _layoutEmpty = new LayoutEmpty(
    "div",
    {
        content: _content,
        attr: {
            class : 'content',
        }
    }
);

renderDOM('#root', _layoutEmpty);


// import layoutEmpty from '../layout/empty'
// import pageError from '../pages/pageError';
//
// const props = {
//     number: '404',
//     text: 'Не туда попали'
// };
// document.getElementById('root').innerHTML = tpl(props);
