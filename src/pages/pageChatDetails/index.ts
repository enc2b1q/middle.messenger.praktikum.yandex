import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import BoxChatHeader from "../../modules/boxChatHeader";
import FormChatMessage from "../../components/formChatMessage";
import BoxChatMessage from "../../modules/boxChatMessage";
import BoxChatMessagesBody from "../../modules/boxChatMessagesBody";
import LayoutChatContentBox from "../../layout/chatContentBox";
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
import store, {StoreKeys} from "../../services/store";


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

const _chat_content_footer = new BoxChatMessage(
    "div",
    {
        formChatMessage: _formChatMessage,

        attr: {
            class: "boxChatMessage_wrapper",
        }
    }
);

const _chat_content_block = new BoxChatMessagesBody(
    "div",
    {
        boxChatMessagesBodyItems: [
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
    private chatsTimerId?: number;

    constructor() {
        super("div", {
            content: _layoutSideBar,
            attr: {
                class: "mainContent",
            }
        });
    }

    leave() {
        if (this.chatsTimerId) {
            clearInterval(this.chatsTimerId);
            this.chatsTimerId = undefined;
            store.set(StoreKeys.chatsTimerId, this.chatsTimerId);
        }
        super.leave();
    }

    componentDidMount() {
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

                        const {chatsTimerId} = store.getState();
                        const chatsTimerIdNum = chatsTimerId as number;

                        if (chatsTimerIdNum != null) {
                            clearInterval(chatsTimerIdNum);
                        }
                        if (this.chatsTimerId != null) {
                            clearInterval(this.chatsTimerId);
                        }
                        this.chatsTimerId = setInterval(() => {
                            ChatController.getChats()
                                .then(
                                    () => {
                                        this.updateChats();
                                        this.updateActiveChats();
                                        this.updateChatBody();
                                    }
                                )
                                .catch(BaseController.showMessage);
                        }, 5000);
                        store.set(StoreKeys.chatsTimerId, this.chatsTimerId);

                    }
                }
            );
    }

    updateChatBody() {
        ChatController.updateChatBody(this);
    }

    updateChats() {
        ChatController.updateChats(this);
    }

    updateActiveChats() {
        ChatController.updateActiveChats(this);
    }

    _updateData() {
        ChatController.updateChats(this);
        ChatController.updateChatBody(this);
    }

    render() {
        return this.compile(tpl);
    }
}
