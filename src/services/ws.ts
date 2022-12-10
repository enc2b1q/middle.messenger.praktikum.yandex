import store, {StoreKeys} from "./store";
import {IUserInfo} from "./interfaces";
import ChatApi from "../api/chatApi";
import BaseController from "../controllers/baseController";
import {FullMessage} from "./types";
import PageChatDetails from "../pages/pageChatDetails";

export default class WS {
    private socket: WebSocket;
    private block:PageChatDetails;
    private wsUserId?: number;
    private wsChatId?: number;
    private isLiveConnection: boolean;
    private timerId?: number;

    private urlPrefix = 'wss://ya-praktikum.tech/ws/chats';

    private onOpen() {
        this.isLiveConnection = true;

        this.getLast20UnreadMessages();

        if (!this.timerId) {
            this.timerId = setInterval(() => {
                this.socket.send(
                    JSON.stringify({
                        type: 'ping',
                    }),
                );
            }, 5000);
        }
    }

    private getLast20UnreadMessages(startMsg: number = 0) {
        this.socket.send(
            JSON.stringify({
                content: `${startMsg}`,
                type: 'get old',
            }),
        );
    }

    sendMessage(message: string) {
        if (this.isLiveConnection) {
            this.socket.send(
                JSON.stringify({
                    content: message,
                    type: 'message',
                }),
            );
        }
        else {
        }
    }

    private onClose() {
        this.isLiveConnection = false;

        //clear timer
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    private onMessage(event: MessageEvent) {
        try {
            const parsedData = JSON.parse(event.data);

            if (Array.isArray(parsedData)) {
                const prevMsgs = parsedData.map((el) => {
                    const msg = new FullMessage;
                    msg.chat_id = el.id;
                    msg.time = el.time;
                    msg.type = el.type;
                    msg.user_id = el.user_id;
                    msg.content = el.content;
                    return msg;
                }).reverse();
                store.set(StoreKeys.messages, prevMsgs);
                this.block.updateChatBody();
            } else if (parsedData.type === 'message') {
                const {messages} = store.getState();
                const msgToSave: [FullMessage] = messages as [FullMessage] ?? [];
                const msg = new FullMessage;
                msg.chat_id = parsedData.chat_id;
                msg.time = parsedData.time;
                msg.type = parsedData.type;
                msg.user_id = parsedData.user_id;
                msg.content = parsedData.content;
                msgToSave.push(msg);
                store.set(StoreKeys.messages, msgToSave);
                this.block.updateChatBody();
            } else if (parsedData.type === 'pong'){
                //do nothing
            }  else if (parsedData.type === 'error') {
                BaseController.showMessage(parsedData.content);
            }
            else {
            }

        } catch (err: any) {
        }


    }

    private onError(event: ErrorEvent) {
        console.log(event.message);
    }


    attach(bl: PageChatDetails){
        this.block = bl;
    }

    connect() {
        const {activeChatId, user} = store.getState();
        const activeChatIdNum = activeChatId as number;
        const userTyped = user as IUserInfo;

        if (!activeChatIdNum) {
            return;
        }
        if (!userTyped) {
            return;
        }

        if (this.wsUserId === userTyped.id && this.wsChatId === activeChatIdNum) {
            return;
        }

        const onOpen = this.onOpen.bind(this);
        const onClose = this.onClose.bind(this);
        const onMessage = this.onMessage.bind(this);
        const onError = this.onError.bind(this);

        ChatApi.takeChatToken(activeChatIdNum)
            .then(
                (data) => {
                    if (this.wsChatId !== undefined) {
                        this.socket.removeEventListener('open', onOpen);
                        this.socket.removeEventListener('close', onClose);
                        this.socket.removeEventListener('message', onMessage);
                        this.socket.removeEventListener('error', onError);
                        const strCloseSocket = `Connection to chat ${this.wsChatId} is closed by user. New chat selected`;
                        this.socket.close(1000, strCloseSocket);
                    }

                    const url = `${this.urlPrefix}/${userTyped.id}/${activeChatIdNum}/${data.token}`;
                    this.socket = new WebSocket(url);
                    this.socket.addEventListener('open', onOpen);
                    this.socket.addEventListener('close', onClose);
                    this.socket.addEventListener('message', onMessage);
                    this.socket.addEventListener('error', onError);

                    this.wsUserId = userTyped.id;
                    this.wsChatId = activeChatIdNum;
                }
            )
            .catch(BaseController.showMessage);

    }


}
