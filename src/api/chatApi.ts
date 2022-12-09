import {BaseApi} from "./baseApi";
import {IChatInfo, ITokenResponse} from "../services/interfaces";
import {AddDeleteUsersToChatFormModel, CreateChatFormModel, DeleteChatFormModel} from "../services/types";


class ChatApi extends BaseApi {
    constructor() {
        super("/chats");
    }

    async getChats(): Promise<IChatInfo[]> {
        return this.http.get("");
    }

    async createChat(data: CreateChatFormModel) {
        return this.http.post("", data);
    }

    async deleteChat(data: DeleteChatFormModel) {
        return this.http.delete("", data);
    }

    addUsersToChat(data: AddDeleteUsersToChatFormModel) {
        return this.http.put("/users", data);
    }

    deleteUsersFromChat(data: AddDeleteUsersToChatFormModel) {
        return this.http.delete("/users", data);
    }

    takeChatToken(chatId: number) : Promise<ITokenResponse> {
        return this.http.post(`/token/${chatId}`);
    }

}

export default new ChatApi();
