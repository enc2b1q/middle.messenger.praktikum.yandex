import './selectChat.scss';
import renderDOM from "../utils/renderDOM";
import LayoutSideBar from "../layout/sideBar";
import LayoutChatSideBox from "../layout/chatSideBox";
import ProfileLinkEdit from "../components/profileLinkEdit";

import LayoutChatContentBox from "../layout/chatContentBox";
import ChatEmptyContent from "../components/chatEmptyContent";
import ChatListItem from "../components/chatListItem";
import {formChatSideBoxInst as _formChatSideBox} from "../components/formChatSideBox";


const _profileLink = new ProfileLinkEdit(
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

const _chatListItem1 = new ChatListItem(
    "div",
    {

        attr: {
            class: "chatListItem_wrapper",
        }
    }
);

const _sideBar = new LayoutChatSideBox(
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

const _chat_content_block = new ChatEmptyContent(
    "div",
    {
        attr: {
            class: "chatEmptyContent_wrapper",
        }
    }
);

// const _chat_content_header = "";
// const _chat_content_footer = "";

const _sideBarContent = new LayoutChatContentBox(
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

const _layoutSideBar = new LayoutSideBar(
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
