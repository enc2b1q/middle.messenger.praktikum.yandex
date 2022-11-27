import HTTP from "../services/http";
import {BaseApi} from "./baseApi";

const chatApiInstance = new HTTP('api/v1/chats');

export default class ChatApi extends BaseApi {
    create() {
        return chatApiInstance.post('/', {title: 'string'});
    }
    request() {
        return chatApiInstance.get('/full');
    }
}