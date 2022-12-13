import ChatApi from "../api/chatApi";
import {IChatInfo, IUserInfo} from "../services/interfaces";
import BaseController from "./baseController";
import store, {StoreKeys} from "../services/store";
import Block from "../services/block";
import {
    AddDeleteUsersToChatFormModel,
    CreateChatFormModel, DeleteChatFormModel, FullMessage,
    MessageFormModel,
    SearchUserFormModel
} from "../services/types";
import ChatListItem from "../components/chatListItem";
import getDateTimeSideBar from "../utils/getDateTimeSideBar";
import getFirstMsgText from "../utils/getFirstMsgText";
import * as validator from '../utils/processFormData'
import {propNames, validationTypedSubmitHandler} from "../utils/processFormData";
import Router from "../services/router";
import BoxChatMessagesBodyItemText from "../components/boxChatMessagesBodyItemText";
import AuthController from "./authController";
import {ws} from '../pages/pageChatDetails';
import UserApi from "../api/userApi";

function hideMenu() {
    const elemMenu = (document.querySelector(`.boxChatHeader_menu`) as HTMLElement);
    if (elemMenu) {
        elemMenu.style.display = 'none';
    }
}

class ChatController {

    async getChats() {
        await ChatApi.getChats()
            .then(
                (data: IChatInfo[]) => {
                    store.set(StoreKeys.chats, data);
                }
            )
            .catch(BaseController.showMessage);
    }

    updateChatBody(block: Block) {
        const {activeChatId, chats, messages, user} = store.getState();

        const elemChatContentHead = (block.getContent().querySelector(`.chat_content_head`) as HTMLElement);

        const elemChatContentNav = (block.getContent().querySelector(`.chat_content_nav`) as HTMLElement);
        const elemBoxChatMessagesBodyWrapper = (block.getContent().querySelector(`.boxChatMessagesBody_wrapper`) as HTMLElement);

        let typedUser = user as IUserInfo;
        if (!typedUser) {
            AuthController.getUserInfo()
                .then(
                    (data) => {
                        if (data) {
                            typedUser = data;
                        } else {
                            return;
                        }
                    }
                );
        }


        if (activeChatId) {
            elemChatContentHead!.style.display = 'flex';
            elemChatContentNav!.style.display = 'flex';
            elemBoxChatMessagesBodyWrapper!.textContent = "";

            ws.connect();

            const messagesTyped = messages as [FullMessage];

            const arr: BoxChatMessagesBodyItemText[] = [];
            if (messagesTyped) {
                messagesTyped.forEach(el => {
                    const alignStr = `${((el.user_id == typedUser.id.toString()) ? " boxChatMessagesBodyItemText_alignRight" : "")}`;
                    const classStr = 'boxChatMessagesBodyItemText_wrapper' + alignStr;

                    const _boxChatMessagesBodyItem = new BoxChatMessagesBodyItemText(
                        "div",
                        {
                            msgText: el.content,
                            attr: {
                                class: classStr,
                            }
                        }
                    );
                    arr.push(_boxChatMessagesBodyItem);
                })
            }

            arr.forEach(item => {
                item.render();
                elemBoxChatMessagesBodyWrapper!.appendChild(item.getContent());
            })

            const chatList = chats as IChatInfo[];
            if (chatList) {
                const activeChatIdNum = activeChatId as number;
                const activeChat = chatList.filter(x => x.id == activeChatIdNum); //no strict
                if (!!activeChat && activeChat.length === 1) {
                    const elChatName = block.getContent().querySelector(`.boxChatHeader_username`) as HTMLElement;
                    if (elChatName) {
                        elChatName!.textContent = (activeChat[0] as IChatInfo).title
                    }
                }
            }

        } else {
            elemChatContentHead!.style.display = 'none';
            elemChatContentNav!.style.display = 'none';
            elemBoxChatMessagesBodyWrapper!.textContent = "Выберите чат, чтобы отправить сообщение";

        }
    }

    updateActiveChats(block: Block) {
        const {activeChatId} = store.getState();
        const activeChatsNS = block.getContent().querySelectorAll(`.chatListItem_wrapper.active`);
        if (activeChatsNS) {
            const activeChatsArr = Array.from(activeChatsNS);
            activeChatsArr.forEach(el => {
                el.classList.remove("active");
            })
        }
        const activeChatIdStr = activeChatId as string;
        if (!!activeChatIdStr) {
            const toActiveCh = block.getContent().querySelector('#chatId' + `${activeChatId}` + '.chatListItem_wrapper');
            if (toActiveCh) {
                toActiveCh.classList.add("active");
            }
        }

    }

    updateChats(block: Block) {
        const {chats, user, activeChatId} = store.getState();
        const chatList = chats as IChatInfo[];
        const currentUser = user as IUserInfo;
        const activeChatIdNum = activeChatId as number;

        const htmlList = block.getContent().querySelector(`.layout_chatSideBox_chatList`) as HTMLElement;
        htmlList!.textContent = "";
        if (!chatList || !!chatList && chatList.length === 0) {
            htmlList!.textContent = "Чаты отсутствуют";
            store.set(StoreKeys.activeChatId, undefined);
        } else {
            chatList.forEach(chatInfoItem => {
                const _chatListItem = new ChatListItem(
                    "div",
                    {
                        title: chatInfoItem.title,
                        unread_count: chatInfoItem.unread_count.toString(),
                        dateTime: chatInfoItem.last_message ? getDateTimeSideBar(chatInfoItem.last_message.time) : "",
                        lastUser: chatInfoItem.last_message ? ((currentUser.id) === chatInfoItem.last_message.user.id ? "Вы:" : "") : "",
                        messageText: chatInfoItem.last_message ? getFirstMsgText(chatInfoItem.last_message.content) : "",
                        events: {
                            click: () => {
                                const activeChatIdValue = chatInfoItem.id.toString();
                                store.set(StoreKeys.activeChatId, activeChatIdValue);
                                const ctrl = new ChatController();
                                ctrl.updateActiveChats(block);
                                ctrl.updateChatBody(block);
                            },
                        },
                        attr: {
                            class: "chatListItem_wrapper",
                            id: `chatId${chatInfoItem.id.toString()}`,
                        }
                    }
                );
                _chatListItem.render();
                const elem = _chatListItem.getContent();
                if (elem) {
                    htmlList!.appendChild(elem);
                }
            }); //foreach

            if (!!activeChatIdNum) {
                const activeChats = chatList.filter(x => x.id == activeChatIdNum);
                if (!activeChats || !!activeChats && activeChats.length === 0) {
                    store.set(StoreKeys.activeChatId, undefined);
                }
            }

        }
    }

    async processAddChatClick(e: Event) {
        e.preventDefault();
        const titleInputStr = prompt('Введите название нового чата');
        if (!titleInputStr) {
            BaseController.showMessage("Введите название");
            return;
        }
        const isValidated = validator.validateItem(propNames.chatTitle, titleInputStr);
        if (!isValidated) {
            BaseController.showMessage(validator.getValidationMsg(propNames.chatTitle));
            return;
        }
        const title = titleInputStr;
        const model = new CreateChatFormModel;
        model.title = title;
        ChatApi.createChat(model)
            .then(() => {
                    const router = new Router("#root");
                    router.go("/messenger");
                }
            )
            .catch(BaseController.showMessage);
    }

    async processChatAddUserClick(e: Event) {
        e.preventDefault();

        const titleUserLoginStr = prompt('Введите логин пользователя для нахождения и добавления в чат');
        if (!titleUserLoginStr) {
            BaseController.showMessage("Введите логин пользователя");
            return;
        }

        const isValidated = validator.validateItem(propNames.login, titleUserLoginStr);
        if (!isValidated) {
            BaseController.showMessage(validator.getValidationMsg(propNames.login));
            return;
        }

        const model = new SearchUserFormModel;
        model.login = titleUserLoginStr;

        UserApi.searchUser(model)
            .then(
                (data) => {
                    let firstUser: IUserInfo;
                    if (data.length === 0) {
                        BaseController.showMessage(`Не найден пользователь ${titleUserLoginStr}`);
                        return;
                    } else if (data.length > 1) {
                        firstUser = data[0];
                        BaseController.showMessage(`Выбран первый пользователь ${firstUser.login} с id = ${firstUser.id}`);
                    } else {
                        firstUser = data[0];
                    }

                    const {activeChatId} = store.getState();
                    const activeChatIdNum = activeChatId as number;
                    if (!!activeChatIdNum) {
                        const model = new AddDeleteUsersToChatFormModel();
                        model.chatId = activeChatIdNum;
                        model.users.push(firstUser.id);

                        ChatApi.addUsersToChat(model)
                            .then(
                                () => {
                                    BaseController.showMessage('Пользователь успешно добавлен в чат');
                                }
                            )
                            .catch(BaseController.showMessage);
                    } else {
                    }

                }
            )
            .catch(BaseController.showMessage);
        hideMenu();
    }

    async processChatDeleteUserClick(e: Event) {
        e.preventDefault();

        const userLoginStr = prompt('Введите логин пользователя для нахождения и удаления из чата');
        if (!userLoginStr) {
            BaseController.showMessage("Введите логин пользователя");
            return;
        }

        const isValidated = validator.validateItem(propNames.login, userLoginStr);
        if (!isValidated) {
            BaseController.showMessage(validator.getValidationMsg(propNames.login));
            return;
        }

        const model = new SearchUserFormModel;
        model.login = userLoginStr;

        UserApi.searchUser(model)
            .then(
                (data) => {
                    let selectedUser: IUserInfo;
                    if (data.length === 0) {
                        BaseController.showMessage(`Не найден пользователь ${userLoginStr}`);
                        return;
                    } else if (data.length > 1) {
                        selectedUser = data[0];
                        BaseController.showMessage(`Выбран первый пользователь ${selectedUser.login} с id = ${selectedUser.id}`);
                    } else {
                        selectedUser = data[0];
                    }

                    const {activeChatId} = store.getState();
                    const activeChatIdNum = activeChatId as number;
                    if (!!activeChatIdNum) {
                        const model = new AddDeleteUsersToChatFormModel();
                        model.chatId = activeChatIdNum;
                        model.users.push(selectedUser.id);

                        ChatApi.deleteUsersFromChat(model)
                            .then(
                                () => {
                                    BaseController.showMessage('Пользователь успешно удален из чата');
                                }
                            )
                            .catch(BaseController.showMessage);
                    } else {
                    }

                }
            )
            .catch(BaseController.showMessage);

        hideMenu();
    }

    async processChatDeleteClick(e: Event) {
        e.preventDefault();

        const askResult = confirm('Удалить чат (может только создатель чата)?');
        if (!askResult) {
            return;
        }

        const {activeChatId} = store.getState();
        const activeChatIdNum = activeChatId as number;
        if (!!activeChatIdNum) {
            const model = new DeleteChatFormModel;
            model.chatId = activeChatIdNum;

            ChatApi.deleteChat(model)
                .then(
                    () => {
                        BaseController.showMessage('Чат успешно удален');

                    }
                )
                .catch(BaseController.showMessage);
        } else {
        }

        hideMenu();
    }

    async processSendMessage(e: SubmitEvent) {
        e.preventDefault();
        const resObj = validationTypedSubmitHandler<MessageFormModel>(e, MessageFormModel);
        const canSendData = resObj.isValidated;
        if (canSendData) {

            ws.sendMessage(resObj.object.message);
        } else {
        }
        const frm = e.target as HTMLFormElement;
        if (frm) {
            const inputMsg = frm.querySelector('.boxChatMessage_input') as HTMLInputElement;
            if (inputMsg) {
                inputMsg.value = "";
            }
        }


    }


}

export default new ChatController();
