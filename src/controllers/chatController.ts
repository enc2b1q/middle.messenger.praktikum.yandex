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
import UserController from "./userController";
import AuthController from "./authController";
import {ws} from '../pages/pageChatDetails';

function hideMenu() {
    const elemMenu = (document.querySelector(`.boxChatHeader_menu`) as HTMLElement);
    if (elemMenu) {
        elemMenu.style.display = 'none';
    }
}

class ChatController {


    async getChats() {
        console.log('ChatController.getChats()');
        await ChatApi.getChats()
            .then(
                (data: IChatInfo[]) => {
                    console.log('success getChats');
                    console.log('IChatInfo[]: ', data);
                    store.set(StoreKeys.chats, data);
                }
            )
            .catch(BaseController.showMessage);
    }

    async createChat(model: CreateChatFormModel) {
        console.log('ChatController.createChat()');
        return ChatApi.createChat(model);
    }

    async deleteChat(model: DeleteChatFormModel) {
        console.log('ChatController.deleteChat()');
        return ChatApi.deleteChat(model);
    }

    async addUsersToChat(model: AddDeleteUsersToChatFormModel) {
        console.log('ChatController.addUsersToChat()');
        return ChatApi.addUsersToChat(model);
    }

    async deleteUsersFromChat(model: AddDeleteUsersToChatFormModel) {
        console.log('ChatController.deleteUsersFromChat()');
        return ChatApi.deleteUsersFromChat(model);
    }

    updateChatBody(block: Block) {
        console.log('updateChatBody store: ', store);
        const {activeChatId, chats, messages, user} = store.getState();

        const elemContent = (block.getContent().querySelector(`.sideBarContent.elemSideBar`) as HTMLElement);
        console.log(elemContent);
        const elemChatContentHead = (block.getContent().querySelector(`.chat_content_head`) as HTMLElement);
        console.log(elemChatContentHead);

        const elemChatContentBody = (block.getContent().querySelector(`.chat_content_body`) as HTMLElement);
        console.log(elemChatContentBody);   //center block

        const elemChatContentNav = (block.getContent().querySelector(`.chat_content_nav`) as HTMLElement);
        console.log(elemChatContentNav);
        const elemBoxChatMessagesBodyWrapper = (block.getContent().querySelector(`.boxChatMessagesBody_wrapper`) as HTMLElement);
        console.log(elemBoxChatMessagesBodyWrapper);

        let typedUser = user as IUserInfo;
        if (!typedUser) {
            AuthController.getUserInfo()
                .then(
                    (us) =>
                        typedUser = us
                );
        }

        if (activeChatId) {
            console.log('update chat msgs');
            elemChatContentHead!.style.display = 'flex';
            elemChatContentNav!.style.display = 'flex';
            elemBoxChatMessagesBodyWrapper!.textContent = "";

            ws.connect();

            const messagesTyped = messages as [FullMessage];

            const arr: BoxChatMessagesBodyItemText[] = [];
            if (messagesTyped) {
                messagesTyped.forEach(el => {
                    console.log('messagesTyped.forEach el: ', el);
                    const alignStr = `${((el.user_id == typedUser.id.toString()) ? " boxChatMessagesBodyItemText_alignRight" : "")}`;
                    console.log('alignStr:', alignStr);
                    const classStr = 'boxChatMessagesBodyItemText_wrapper' + alignStr;
                    console.log('classStr:', classStr);

                    const _boxChatMessagesBodyItem = new BoxChatMessagesBodyItemText(
                        "div",
                        {
                            msgText: el.content,
                            attr: {
                                // class: "boxChatMessagesBodyItemText_wrapper boxChatMessagesBodyItemText_alignRight",
                                class: classStr,
                            }
                        }
                    );
                    arr.push(_boxChatMessagesBodyItem);
                })
            }

            // const N = 2;
            // for (let i = 0; i < N; i++) {
            //     const _boxChatMessagesBodyItem1 = new BoxChatMessagesBodyItemText(
            //         "div",
            //         {
            //             msgText: "Новый чат!",
            //             attr: {
            //                 // class: "boxChatMessagesBodyItemText_wrapper boxChatMessagesBodyItemText_alignRight",
            //                 class: "boxChatMessagesBodyItemText_wrapper boxChatMessagesBodyItemText_alignLeft",
            //             }
            //         }
            //     );
            //     arr.push(_boxChatMessagesBodyItem1);
            // }

            // const _boxChatMessagesBodyItem1 = new BoxChatMessagesBodyItemText(
            //     "div",
            //     {
            //         msgText: "Новый чат!",
            //         attr: {
            //             // class: "boxChatMessagesBodyItemText_wrapper boxChatMessagesBodyItemText_alignRight",
            //             class: "boxChatMessagesBodyItemText_wrapper boxChatMessagesBodyItemText_alignLeft",
            //         }
            //     }
            // );
            // arr.push(_boxChatMessagesBodyItem1);
            // const _boxChatMessagesBodyItem2 = new BoxChatMessagesBodyItemText(
            //     "div",
            //     {
            //         msgText: "привет!",
            //         attr: {
            //             class: "boxChatMessagesBodyItemText_wrapper boxChatMessagesBodyItemText_alignRight",
            //         }
            //     }
            // );
            // arr.push(_boxChatMessagesBodyItem2);

            arr.forEach(item => {
                item.render();
                elemBoxChatMessagesBodyWrapper!.appendChild(item.getContent());
            })

            const chatList = chats as IChatInfo[];
            console.log('chatList', chatList);
            if (chatList) {
                console.log('activeChatId: ', activeChatId);
                const activeChatIdNum = activeChatId as Number;
                console.log('activeChatIdNum: ', activeChatIdNum);
                const activeChat = chatList.filter(x => x.id == activeChatIdNum); //no strict
                console.log('filtered activeChat: ', activeChat);
                if (!!activeChat && activeChat.length === 1) {
                    const elChatName = block.getContent().querySelector(`.boxChatHeader_username`) as HTMLElement;
                    console.log(elChatName)
                    if (elChatName) {
                        elChatName!.textContent = (activeChat[0] as IChatInfo).title
                    }
                }
            }

        } else {
            console.log('no activeChatId to update');
            elemChatContentHead!.style.display = 'none';
            elemChatContentNav!.style.display = 'none';
            elemBoxChatMessagesBodyWrapper!.textContent = "Выберите чат, чтобы отправить сообщение";


        }
    }

    updateActiveChats(block: Block) {
        console.log('updateActiveChats store: ', store);
        const {activeChatId} = store.getState();
        const activeChatsNS = block.getContent().querySelectorAll(`.chatListItem_wrapper.active`);
        if (activeChatsNS) {
            const activeChatsArr = Array.from(activeChatsNS);
            activeChatsArr.forEach(el => {
                console.log('active el: ', el);
                console.log('active el classList: ', el.classList);
                el.classList.remove("active");
            })
        }
        const activeChatIdStr = activeChatId as string;
        if (!!activeChatIdStr) {
            console.log('activeChatIdStr: ', activeChatIdStr);
            const toActiveCh = block.getContent().querySelector('#chatId' + `${activeChatId}` + '.chatListItem_wrapper');
            console.log('toActiveCh: ', toActiveCh);
            if (toActiveCh) {
                console.log('toActiveCh classList: ', toActiveCh.classList);
                toActiveCh.classList.add("active");
            }
        }

    }

    updateChats(block: Block) {
        console.log('store: ', store);
        const {chats, user} = store.getState();
        console.log('chats at store:', chats);
        const chatList = chats as IChatInfo[];
        const currentUser = user as IUserInfo;

        // const lastMsg1: ILastMessage = new LastMessage();
        // lastMsg1.content = "This is test message";
        // lastMsg1.time = "2022-12-06T14:22:22.000Z";
        // lastMsg1.user = user as IUserInfo;
        //
        // const chatId1 = new ChatInfo();
        // chatId1.avatar = "";
        // chatId1.id = 100500;
        // chatId1.last_message = lastMsg1;
        // chatId1.title = "testTitle";
        // chatId1.unread_count = 7;
        //
        // chatList.push(chatId1);

        if (!chatList || !!chatList && chatList.length === 0) {
            console.log('chatList is empty:', chatList);
            (block.getContent().querySelector(`.layout_chatSideBox_chatList`) as HTMLElement)!.textContent = "Чаты отсутствуют";
        } else {
            console.log('chatList:', chatList);
            chatList.forEach(chatInfoItem => {
                const _chatListItem1 = new ChatListItem(
                    "div",
                    {
                        title: chatInfoItem.title,
                        unread_count: chatInfoItem.unread_count.toString(),
                        dateTime: chatInfoItem.last_message ? getDateTimeSideBar(chatInfoItem.last_message.time) : "",
                        lastUser: chatInfoItem.last_message ? ((currentUser.id) === chatInfoItem.last_message.user.id ? "Вы:" : "") : "",
                        messageText: chatInfoItem.last_message ? getFirstMsgText(chatInfoItem.last_message.content) : "",
                        events: {
                            click: () => {
                                console.log('ChatListItem clicked');
                                const activeChatIdValue = chatInfoItem.id.toString();
                                console.log('activeChatIdValue: ', activeChatIdValue);
                                store.set(StoreKeys.activeChatId, activeChatIdValue);
                                console.log(store);
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
                _chatListItem1.render();
                const elem = _chatListItem1.getContent();
                console.log('elem: ', elem);
                if (elem) {
                    const htmlList = (block.getContent().querySelector(`.layout_chatSideBox_chatList`) as HTMLElement);
                    if (chatList.length === 1) {
                        htmlList!.textContent = "";
                    }
                    htmlList!.appendChild(elem);
                    console.log('htmlList: ', htmlList);
                }
            }); //foreach
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
        const ctrl = new ChatController;
        const model = new CreateChatFormModel;
        model.title = title;
        ctrl.createChat(model)
            .then(() => {
                    console.log('success createChat');
                    const router = new Router("#root");
                    router.go("/messenger");
                }
            )
            .catch(BaseController.showMessage);
    }

    async processChatAddUserClick(e: Event) {
        e.preventDefault();
        console.log('processChatAddUSerClick');

        const titleUserLoginStr = prompt('Введите логин пользователя для нахождения и добавления в чат');
        console.log('titleUserLoginStr: ', titleUserLoginStr);
        if (!titleUserLoginStr) {
            BaseController.showMessage("Введите логин пользователя");
            return;
        }

        const isValidated = validator.validateItem(propNames.login, titleUserLoginStr);
        console.log('isValidated: ', isValidated);
        if (!isValidated) {
            BaseController.showMessage(validator.getValidationMsg(propNames.login));
            return;
        }

        const model = new SearchUserFormModel;
        model.login = titleUserLoginStr;
        console.log('SearchUserFormModel', model);

        UserController.searchUser(model)
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
                    console.log('firstUser: ', firstUser);

                    console.log('add to chat');
                    const {activeChatId} = store.getState();
                    const activeChatIdNum = activeChatId as number;
                    if (!!activeChatIdNum) {
                        const model = new AddDeleteUsersToChatFormModel();
                        model.chatId = activeChatIdNum;
                        model.users.push(firstUser.id);
                        console.log('AddUsersToChatFormModel: ', model);

                        const ctrl = new ChatController();
                        ctrl.addUsersToChat(model)
                            .then(
                                () => {
                                    console.log('success addUsersToChat');
                                    BaseController.showMessage('Пользователь успешно добавлен в чат');
                                }
                            )
                            .catch(BaseController.showMessage);
                    } else {
                        console.log('no activeChatIdNum to add user');
                    }

                }
            )
            .catch(BaseController.showMessage);
        hideMenu();
    };

    async processChatDeleteUserClick(e: Event) {
        e.preventDefault();
        console.log('processChatDeleteUserClick');

        const userLoginStr = prompt('Введите логин пользователя для нахождения и удаления из чата');
        console.log('userLoginStr: ', userLoginStr);
        if (!userLoginStr) {
            BaseController.showMessage("Введите логин пользователя");
            return;
        }

        const isValidated = validator.validateItem(propNames.login, userLoginStr);
        console.log('isValidated: ', isValidated);
        if (!isValidated) {
            BaseController.showMessage(validator.getValidationMsg(propNames.login));
            return;
        }

        const model = new SearchUserFormModel;
        model.login = userLoginStr;
        console.log('SearchUserFormModel', model);

        UserController.searchUser(model)
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
                    console.log('selectedUser: ', selectedUser);

                    console.log('delete from chat');
                    const {activeChatId} = store.getState();
                    const activeChatIdNum = activeChatId as number;
                    if (!!activeChatIdNum) {
                        const model = new AddDeleteUsersToChatFormModel();
                        model.chatId = activeChatIdNum;
                        model.users.push(selectedUser.id);
                        console.log('Delete users from chat FormModel: ', model);

                        const ctrl = new ChatController();
                        ctrl.deleteUsersFromChat(model)
                            .then(
                                () => {
                                    console.log('success deleteUsersFromChat');
                                    BaseController.showMessage('Пользователь успешно удален из чата');
                                }
                            )
                            .catch(BaseController.showMessage);
                    } else {
                        console.log('no activeChatIdNum to delete user from chat');
                    }

                }
            )
            .catch(BaseController.showMessage);

        // const elemMenu = (document.querySelector(`.boxChatHeader_menu`) as HTMLElement);
        // if (elemMenu) {
        //     elemMenu.style.display = 'none';
        // }
        hideMenu();
    }

    async processChatDeleteClick(e: Event) {
        e.preventDefault();
        console.log('processChatDeleteClick');

        const askResult = confirm('Удалить чат (может только создатель чата)?');
        console.log('askResult: ', askResult);
        if (!askResult) {
            console.log('No chat deletion');
            return;
        }

        const {activeChatId} = store.getState();
        const activeChatIdNum = activeChatId as number;
        if (!!activeChatIdNum) {
            const model = new DeleteChatFormModel;
            model.chatId = activeChatIdNum;
            console.log(`delete active chat with id = ${model.chatId}. DeleteChatFormModel: `, model);

            const ctrl = new ChatController();
            ctrl.deleteChat(model)
                .then(
                    () => {
                        console.log('success deleteChat');
                        BaseController.showMessage('Чат успешно удален');
                        //update chats
                    }
                )
                .catch(BaseController.showMessage);
        } else {
            console.log('no activeChatIdNum to delete chat');
        }

        // const elemMenu = (document.querySelector(`.boxChatHeader_menu`) as HTMLElement);
        // if (elemMenu) {
        //     elemMenu.style.display = 'none';
        // }
        hideMenu();
    }

    async processSendMessage(e: SubmitEvent) {
        e.preventDefault();
        console.log('submit: ChatController processSendMessage');
        const resObj = validationTypedSubmitHandler<MessageFormModel>(e, MessageFormModel);
        console.log(resObj);
        const canSendData = resObj.isValidated;
        if (canSendData) {
            console.log('canSendData');
            console.log(resObj.object);

            //send form data as object
            ws.sendMessage(resObj.object.message);
        } else {
            console.log('can not send Data');
        }
        console.log('clear boxChatMessage_input');
        const frm = e.target as HTMLFormElement;
        if (frm){
            const inputMsg = frm.querySelector('.boxChatMessage_input') as HTMLInputElement;
            if (inputMsg) {
                inputMsg.value = "";
            }
        }


    }


}

export default new ChatController();
