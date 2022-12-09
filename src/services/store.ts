import {Indexed} from "./types";
import EventBus from "./eventBus";
import set from '../utils/set';

// function set(state: Indexed, path: string, value: unknown) {
// /*
// const state = {};
//
// set(state, 'user.name', 'John');
// console.log(state); // { user: { name: 'John' } }
//     */
//
// }

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
    };

    public set(path: string, value: unknown) {
        console.log('new saving to store:');
        console.log('path: ', path);
        console.log('value: ', value);

        set(this.state, path, value);

        console.log('state:', this.state);

        this.emit(StoreEvents.UPDATED);
    };
}
export default new Store();
