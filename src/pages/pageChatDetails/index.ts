import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import BoxChatHeader from "../../modules/boxChatHeader";
import FormChatMessage from "../../components/formChatMessage";
import BoxChatMessage from "../../modules/boxChatMessage";
import BoxChatMessagesBody from "../../modules/boxChatMessagesBody";
import LayoutChatContentBox from "../../layout/chatContentBox";
// import ChatListItem from "../../components/chatListItem";
import ProfileLinkEdit from "../../components/profileLinkEdit";
import LayoutChatSideBox from "../../layout/chatSideBox";
import {formChatSideBoxInst as _formChatSideBox} from "../../components/formChatSideBox";
import LayoutSideBar from "../../layout/sideBar";
import BaseController from "../../controllers/baseController";
import Router from "../../services/router";
import ChatController from "../../controllers/chatController";
import Button from "../../components/button";
import GenericTag from "../../components/genericTag";
import WS from "../../services/ws";


export const ws = new WS();

const _btnAdd = new Button(
    "button",
    {
        text: "Добавить пользователя",
        attr: {
            id: "btnChatAddUserId",
            type: "submit",
            class: "button",
        },
        events: {
            click: ChatController.processChatAddUserClick,
        }
    }
);

const _btnDelete = new Button(
    "button",
    {
        text: "Удалить пользователя",
        attr: {
            id: "btnChatDeleteUserId",
            type: "submit",
            class: "button",
        },
        events: {
            click: ChatController.processChatDeleteUserClick,
        }
    }
);

const _btnDeleteChat = new Button(
    "button",
    {
        text: "Удалить чат",
        attr: {
            id: "btnChatDeleteId",
            type: "submit",
            class: "button",
        },
        events: {
            click: ChatController.processChatDeleteClick,
        }
    }
);

const _menuBtn = new GenericTag(
    "input",
    {
        attr: {
            type: 'button',
            id: "boxChatHeader_btn",
            value: String.fromCharCode(0x2807),
        },
        events: {
            click: (e: Event) => {
                e.preventDefault();
                const elemMenu = (document.querySelector(`.boxChatHeader_menu`) as HTMLElement);
                if (elemMenu) {
                    if (elemMenu.style.display === 'block') {
                        elemMenu.style.display = 'none';
                        return;
                    }
                    elemMenu.style.display = 'block';
                }

            },
        },
    }
);

const _chat_content_header = new BoxChatHeader(
    "div",
    {
        menuBtn: _menuBtn,
        btnAdd: _btnAdd,
        btnDelete: _btnDelete,
        btnDeleteChat: _btnDeleteChat,
        attr: {
            class: "boxChatHeader_wrapper",
        }
    }
);

const _formChatMessage = new FormChatMessage(
    "form",
    {
        events: {
            submit: ChatController.processSendMessage,
        },
        attr: {
            class: "boxChatMessage_form",
            id: "formBoxChatMessage",
            action: "#",
            method: "POST",
        }
    }
);

// const _btnSendMsg = new Button(
//     "button",
//     {
//         text: "->",
//         attr: {
//             id: "boxChatMessage_send_btn-id",
//             type: "submit",
//             class: "button",
//         },
//         events: {
//             click: ChatController.processChatDeleteUserClick,
//         }
//     }
// );

const _chat_content_footer = new BoxChatMessage(
    "div",
    {
        formChatMessage: _formChatMessage,

        attr: {
            class: "boxChatMessage_wrapper",
        }
    }
);

// const _boxChatMessagesBodyItem1 = new BoxChatMessagesBodyItemText(
//     "div",
//     {
//         msgText: "Новый чат!",
//         // alignClass: "boxChatMessagesBodyItemText_alignLeft",
//         attr: {
//             class: "boxChatMessagesBodyItemText_wrapper",
//         }
//     }
// );
// const _boxChatMessagesBodyItem2 = new BoxChatMessagesBodyItemText(
//     "div",
//     {
//         msgText: "привет!",
//         // alignClass: "boxChatMessagesBodyItemText_alignRight",
//         attr: {
//             class: "boxChatMessagesBodyItemText_wrapper",
//         }
//     }
// );

const _chat_content_block = new BoxChatMessagesBody(
    "div",
    {
        boxChatMessagesBodyItems: [
            // _boxChatMessagesBodyItem1,
            // _boxChatMessagesBodyItem2
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

// const _chatListItem1 = new ChatListItem(
//     "div",
//     {
//
//         attr: {
//             class: "chatListItem_wrapper",
//         }
//     }
// );

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

    componentDidMount() {
        console.log('PageChatDetails componentDidMount');
        ws.attach(this);
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

    updateChatBody(){
        ChatController.updateChatBody(this);
    }

    _updateData() {
        ChatController.updateChats(this);
        ChatController.updateChatBody(this);

        // const {activeChatId} = store.getState();
        // if (activeChatId) {
        //
        // }
    }

    render() {
        console.log('PageChatDetails render');
        return this.compile(tpl);
    }
}
