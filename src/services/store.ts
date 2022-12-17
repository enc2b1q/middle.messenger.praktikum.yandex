import {Indexed} from "./types";
import EventBus from "./eventBus";
import set from '../utils/set';

export enum StoreKeys {
    user = 'user',
    chats = 'chats',
    activeChatId = 'activeChatId',
    messages = 'messages',
    chatsTimerId = 'chatsTimerId',
}

export enum StoreEvents {
    UPDATED = 'updated',
}

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {

        set(this.state, path, value);


        this.emit(StoreEvents.UPDATED);
    }
}
export default new Store();
