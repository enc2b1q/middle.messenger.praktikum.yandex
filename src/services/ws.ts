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
        console.log('onOpen');
        this.isLiveConnection = true;

        //get msgs
        this.getLast20UnreadMessages();

        //run ping
        if (!this.timerId) {
            this.timerId = setInterval(() => {
                // console.log('ws ping');
                this.socket.send(
                    JSON.stringify({
                        type: 'ping',
                    }),
                );
            }, 5000);
        }
    }

    private getLast20UnreadMessages(startMsg: number = 0) {
        console.log('getLast20UnreadMessages');
        this.socket.send(
            JSON.stringify({
                content: `${startMsg}`,
                type: 'get old',
            }),
        );
    }

    sendMessage(message: string) {
        console.log('sendMessage: ', message);
        if (this.isLiveConnection) {
            console.log('ws isLiveConnection');
            this.socket.send(
                JSON.stringify({
                    content: message,
                    type: 'message',
                }),
            );
        }
        else {
            console.log('ws not isLiveConnection');
        }
    }

    private onClose() {
        console.log('onClose');
        this.isLiveConnection = false;

        //clear timer
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    private onMessage(event: MessageEvent) {
        // console.log('onMessage: ', event);

        //use type check on [msg] instead of try catch
        try {
            const parsedData = JSON.parse(event.data);
            // console.log('parsedData: ', parsedData);

            if (Array.isArray(parsedData)) {
                console.log('parsedData: ', parsedData);
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
                console.log('store (messages): ', store);
                this.block.updateChatBody();
            } else if (parsedData.type === 'message') {
                console.log('parsedData: ', parsedData);
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
                console.log('store (messages): ', store);
                this.block.updateChatBody();
            } else if (parsedData.type === 'pong'){
                //do nothing
                // console.log('pong: ', parsedData);
            }  else if (parsedData.type === 'error') {
                BaseController.showMessage(parsedData.content);
            }
            else {
                console.log('unsupported onMessage data: ', parsedData);
            }

        } catch (err: any) {
            console.log('onMessage error: ', err);
        }


    }

    private onError(event: ErrorEvent) {
        console.log('onError, event: ', event);
        console.log('onError, error msg: ', event.message);
        console.log('onError, error: ', event.error);
    }


    attach(bl: PageChatDetails){
        this.block = bl;
    }

    connect() {
        console.log('ws.connect');
        console.log('store: ', store);
        const {activeChatId, user} = store.getState();
        const activeChatIdNum = activeChatId as number;
        const userTyped = user as IUserInfo;

        if (!activeChatIdNum) {
            console.log('no activeChatId at store: ', activeChatId);
            return;
        }
        if (!userTyped) {
            console.log('no user at store: ', user);
            return;
        }

        if (this.wsUserId === userTyped.id && this.wsChatId === activeChatIdNum) {
            console.log('current ws chat and user. return;');
            return;
        }

        const onOpen = this.onOpen.bind(this);
        const onClose = this.onClose.bind(this);
        const onMessage = this.onMessage.bind(this);
        const onError = this.onError.bind(this);

        ChatApi.takeChatToken(activeChatIdNum)
            .then(
                (data) => {
                    console.log('ChatToken is taken: ', data.token);
                    if (this.wsChatId !== undefined) {
                        this.socket.removeEventListener('open', onOpen);
                        this.socket.removeEventListener('close', onClose);
                        this.socket.removeEventListener('message', onMessage);
                        this.socket.removeEventListener('error', onError);
                        const strCloseSocket = `Connection to chat ${this.wsChatId} is closed by user. New chat selected`;
                        console.log(strCloseSocket);
                        this.socket.close(1000, strCloseSocket);
                    }

                    const url = `${this.urlPrefix}/${userTyped.id}/${activeChatIdNum}/${data.token}`;
                    console.log('add ws url: ', url);
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