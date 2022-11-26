import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import ProfileLinkEdit from "../../components/profileLinkEdit";
import ChatListItem from "../../components/chatListItem";
import LayoutChatSideBox from "../../layout/chatSideBox";
import {formChatSideBoxInst as _formChatSideBox} from "../../components/formChatSideBox";
import ChatEmptyContent from "../../components/chatEmptyContent";
import LayoutChatContentBox from "../../layout/chatContentBox";
import LayoutSideBar from "../../layout/sideBar";



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


export default class PageChatSelection extends Block {
    constructor() {
        super("div", {
            content: _layoutSideBar,
            attr: {
                class: "mainContent",
            }
        });
    }

    render() {
        console.log('PageChatSelection render');
        return this.compile(tpl);
    }
}

