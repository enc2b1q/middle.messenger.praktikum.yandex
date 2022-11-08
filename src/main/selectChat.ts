import './selectChat.scss';
import renderDOM from "../utils/renderDOM";
import layoutSideBar from "../layout/sideBar";
import layoutChatSideBox from "../layout/chatSideBox";
import profileLinkEdit from "../components/profileLinkEdit";

import layoutChatContentBox from "../layout/chatContentBox";
import chatEmptyContent from "../components/chatEmptyContent";
import chatListItem from "../components/chatListItem";
import {formChatSideBoxInst as _formChatSideBox} from "../components/formChatSideBox";


const _profileLink = new profileLinkEdit(
    "nav",
    {
        url: "/profile.html",
        profileLinkEdit_color_class: "profileLinkEdit_a_gray",
        linkText: "Профиль",

        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_end",
        }
    }
);

const _chatListItem1 = new chatListItem(
    "div",
    {

        attr: {
            class: "chatListItem_wrapper",
        }
    }
);

const _sideBar = new layoutChatSideBox(
    "div",
    {
        profileLink: _profileLink,
        boxChatList: [
            _chatListItem1,
        ],
        formChatSideBox: _formChatSideBox,

        attr: {
            class: "layout_chatSideBox_wrapper_box",
        }
    }
);

const _chat_content_block = new chatEmptyContent(
    "div",
    {
        attr: {
            class: "chatEmptyContent_wrapper",
        }
    }
);

// const _chat_content_header = "";
// const _chat_content_footer = "";

const _sideBarContent = new layoutChatContentBox(
    "div",
    {
        // chat_content_header: _chat_content_header,
        chat_content_block: _chat_content_block,
        // chat_content_footer: _chat_content_footer,

        attr: {
            class: "chat_content_wrapper",
        }
    }
);

const _layoutSideBar = new layoutSideBar(
    "div",
    {
        sideBar: _sideBar,
        sideBarContent: _sideBarContent,
        sizeClass: "sideBar-big",

        attr: {
            class: "container",
        }
    }
);

renderDOM("#root", _layoutSideBar);


// import pageChatSelection from '../pages/pageChatSelection';
//
// const props = {
// };
// document.getElementById('root').innerHTML = tpl(props);
