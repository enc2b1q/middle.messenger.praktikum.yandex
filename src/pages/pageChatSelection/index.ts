import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import ProfileLinkEdit from "../../components/profileLinkEdit";
// import ChatListItem from "../../components/chatListItem";
import LayoutChatSideBox from "../../layout/chatSideBox";
import {formChatSideBoxInst as _formChatSideBox} from "../../components/formChatSideBox";
import ChatEmptyContent from "../../components/chatEmptyContent";
import LayoutChatContentBox from "../../layout/chatContentBox";
import LayoutSideBar from "../../layout/sideBar";
import BaseController from "../../controllers/baseController";
import Router from "../../services/router";
import ChatController from "../../controllers/chatController";
import Button from "../../components/button";


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

// const _chatListItem1 = new ChatListItem(
//     "div",
//     {
//
//         attr: {
//             class: "chatListItem_wrapper",
//         }
//     }
// );

const _chatAddBtn = new Button(
    "button",
    {
        text: "Новый чат",
        attr: {
            id: "btnNewChatId",
            type: "submit",
            class: "button",
        },
        events: {
            click: ChatController.processAddChatClick,
        }
    }
);

const _sideBar = new LayoutChatSideBox(
    "div",
    {
        chatAddBtn: _chatAddBtn,
        profileLink: _profileLink,
        boxChatList: [
            // _chatListItem1,
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

    componentDidMount() {
        console.log('PageChatSelection componentDidMount');

        BaseController.testAuth()
            .then(
                (isAuth) => {
                    if (!isAuth) {
                        const router = new Router("#root");
                        router.go("/");
                    } else {
                        ChatController.getChats()
                            .then(
                                () => this._updateData()
                            )
                            .catch(BaseController.showMessage);
                    }
                }
            );

    }

    private _updateData() {
        ChatController.updateChats(this);

    }

    render() {
        console.log('PageChatSelection render');
        return this.compile(tpl);
    }
}

