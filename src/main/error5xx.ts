import renderDOM from "../utils/renderDOM";
// import tpl from './error5xxTpl';
import './error5xx.scss';
import pageError from '../pages/pageError';
import layoutEmpty from "../layout/empty";
import errorBox from "../components/errorBox";
import {_linkBackToChatInst as _link} from "../components/link";

// const _link = new link(
//     "nav",
//     {
//         url: '/selectChat.html',
//         text: 'Назад к чатам',
//         attr: {
//             class : 'link',
//             id: "lnkBackId",
//         }
//     }
// );

const _errorBox = new errorBox(
    "section",
    {
        number: '500',
        text: 'Мы уже фиксим',
        link: _link,
        attr: {
            class : 'errorBox',
            id: "errorBoxId",
        }
    }
);

const _content = new pageError(
    "article",
    {
        errorBox: _errorBox,
        attr: {
            class : 'page-box',
        }
    }
);

const _layoutEmpty = new layoutEmpty(
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
//     number: '500',
//     text: 'Мы уже фиксим'
// };
// document.getElementById('root').innerHTML = tpl(props);
