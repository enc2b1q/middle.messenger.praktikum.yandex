import {IChatInfo, ILastMessage, IUserInfo} from "./interfaces";

export type TypeDict<T = unknown> = {
    [key: string | number]: T
}

export type TypeDictUnknown = TypeDict<unknown>;

export type TypeDictRootQuery<T = unknown> = TypeDict<T> & {
    rootQuery: string;
}

export type TypeDefinedProps = {
    "setting"?: TypeDict<boolean | string>;
    "attr"?: TypeDict<string>;
    "events"?: TypeDict<EventListenerOrEventListenerObject>;

};

export type TypeMixedUnknownProps = TypeDefinedProps & TypeDictUnknown;

export type Indexed<T = unknown> = Record<string, T>;

export type PlainObject<T = any> = {
    [k in string]: T;
};

export class LoginFormModel {
    login = "";
    password = "";
}

export class MessageFormModel {
    message = "";
}

export class ValidationResult<T extends Record<string, any>> {
    isValidated: boolean;
    object: T;

    constructor(type: (new () => T)) {
        this.isValidated = false;
        this.object = new type();
    }
}

export class RejectModel {
    status: number;
    reason: string | null;
    sourceBody: any;
}

export class SignupFormModel {
    first_name = "";
    second_name = "";
    login = "";
    email = "";
    password = "";
    phone = "";
}

export class SignupViewFormModel extends SignupFormModel {
    password_repeat = "";

    constructor() {
        super();
    }
}

export class ChangePasswordFormModel {
    oldPassword = "";
    newPassword = "";
}

export class SearchUserFormModel {
    login = "";
}

export class ChangePasswordViewFormModel extends ChangePasswordFormModel {
    password_repeat = "";
}

export class EditProfileFormModel {
    first_name = "";
    second_name = "";
    display_name = "";
    login = "";
    email = "";
    phone = "";
}

export class UserInfo implements IUserInfo {
    avatar: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
}

export class LastMessage implements ILastMessage {
    content: string;
    time: string;
    user: IUserInfo;
}

export class FullMessage {
    chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
}

export class ChatInfo implements IChatInfo {
    avatar: string;
    id: number;
    last_message: ILastMessage;
    title: string;
    unread_count: number;
}

export class CreateChatFormModel {
    title = "";
}

export class DeleteChatFormModel {
    chatId: number;
}

export class AddDeleteUsersToChatFormModel {
    users: Array<number> = new Array<number>();
    chatId: number;
}
