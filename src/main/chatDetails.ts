import './chatDetails.scss';
import renderDOM from "../utils/renderDOM";
import layoutSideBar from "../layout/sideBar";
import layoutChatSideBox from "../layout/chatSideBox";

import profileLinkEdit from "../components/profileLinkEdit";
import layoutChatContentBox from "../layout/chatContentBox";
import boxChatHeader from "../modules/boxChatHeader";
import boxChatMessage from "../modules/boxChatMessage";
import chatListItem from "../components/chatListItem";
import boxChatMessagesBody from "../modules/boxChatMessagesBody";
import boxChatMessagesBodyItemText from "../components/boxChatMessagesBodyItemText";


const _chat_content_header = new boxChatHeader(
    "div",
    {
        attr: {
            class: "boxChatHeader_wrapper",
        }
    }
);

const _chat_content_footer = new boxChatMessage(
    "div",
    {

        attr: {
            class: "boxChatMessage_wrapper",
        }
    }
);

const _boxChatMessagesBodyItem1 = new boxChatMessagesBodyItemText(
    "div",
    {
        msgText: "Новый чат!",
        // alignClass: "boxChatMessagesBodyItemText_alignLeft",
        attr: {
            class: "boxChatMessagesBodyItemText_wrapper",
        }
    }
);
const _boxChatMessagesBodyItem2 = new boxChatMessagesBodyItemText(
    "div",
    {
        msgText: "привет!",
        // alignClass: "boxChatMessagesBodyItemText_alignRight",
        attr: {
            class: "boxChatMessagesBodyItemText_wrapper",
        }
    }
);

const _chat_content_block = new boxChatMessagesBody(
    "div",
    {
        boxChatMessagesBodyItems: [
            _boxChatMessagesBodyItem1,
            _boxChatMessagesBodyItem2
        ],

        attr: {
            class: "boxChatMessagesBody_wrapper",
        }
    }
);

const _sideBarContent = new layoutChatContentBox(
    "div",
    {
        chat_content_header: _chat_content_header,
        chat_content_block: _chat_content_block,
        chat_content_footer: _chat_content_footer,

        attr: {
            class: "chat_content_wrapper",
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

const _sideBar = new layoutChatSideBox(
    "div",
    {
        profileLink: _profileLink,
        boxChatList: [
            _chatListItem1,
        ],

        attr: {
            class: "layout_chatSideBox_wrapper_box",
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


// import pageChatDetails from '../pages/pageChatDetails';
//
// const props = {
// };
// document.getElementById('root').innerHTML = tpl(props);
