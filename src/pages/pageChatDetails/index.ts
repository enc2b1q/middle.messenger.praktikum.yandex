import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import BoxChatHeader from "../../modules/boxChatHeader";
import FormChatMessage from "../../components/formChatMessage";
import {validationSubmitHandler} from "../../utils/processFormData";
import BoxChatMessage from "../../modules/boxChatMessage";
import BoxChatMessagesBodyItemText from "../../components/boxChatMessagesBodyItemText";
import BoxChatMessagesBody from "../../modules/boxChatMessagesBody";
import LayoutChatContentBox from "../../layout/chatContentBox";
import ChatListItem from "../../components/chatListItem";
import ProfileLinkEdit from "../../components/profileLinkEdit";
import LayoutChatSideBox from "../../layout/chatSideBox";
import {formChatSideBoxInst as _formChatSideBox} from "../../components/formChatSideBox";
import LayoutSideBar from "../../layout/sideBar";



const _chat_content_header = new BoxChatHeader(
    "div",
    {
        attr: {
            class: "boxChatHeader_wrapper",
        }
    }
);

const _formChatMessage = new FormChatMessage(
    "form",
    {
        events: {
            submit: validationSubmitHandler,
        },
        attr: {
            class: "boxChatMessage_form",
            id: "formBoxChatMessage",
            action: "#",
            method: "POST",
        }
    }
);

const _chat_content_footer = new BoxChatMessage(
    "div",
    {
        formChatMessage: _formChatMessage,

        attr: {
            class: "boxChatMessage_wrapper",
        }
    }
);

const _boxChatMessagesBodyItem1 = new BoxChatMessagesBodyItemText(
    "div",
    {
        msgText: "Новый чат!",
        // alignClass: "boxChatMessagesBodyItemText_alignLeft",
        attr: {
            class: "boxChatMessagesBodyItemText_wrapper",
        }
    }
);
const _boxChatMessagesBodyItem2 = new BoxChatMessagesBodyItemText(
    "div",
    {
        msgText: "привет!",
        // alignClass: "boxChatMessagesBodyItemText_alignRight",
        attr: {
            class: "boxChatMessagesBodyItemText_wrapper",
        }
    }
);

const _chat_content_block = new BoxChatMessagesBody(
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

const _sideBarContent = new LayoutChatContentBox(
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

const _chatListItem1 = new ChatListItem(
    "div",
    {

        attr: {
            class: "chatListItem_wrapper",
        }
    }
);

const _profileLink = new ProfileLinkEdit(
    "nav",
    {
        url: "/settings.html",
        profileLinkEdit_color_class: "profileLinkEdit_a_gray",
        linkText: "Профиль",

        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_end",
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

export default class PageChatDetails extends Block {
    constructor() {
        super("div", {
            content: _layoutSideBar,
            attr: {
                class: "mainContent",
            }
        });
    }

    render() {
        console.log('PageChatDetails render');
        return this.compile(tpl);
    }
}
