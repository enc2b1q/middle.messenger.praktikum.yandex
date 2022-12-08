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

export type Indexed<T = unknown> = Record<string, T>;  //Record<string, any>;

// export interface IBlockProps extends Record<string, unknown> {
//     "setting"?: TypeDict<boolean | string>;
//     "attr"?: TypeDict<string>;
//     "events"?: TypeDict<EventListenerOrEventListenerObject>,
//     rootQuery?: string;
// };

export type PlainObject<T = any> = {
    [k in string]: T;
};

export class LoginFormModel {
    login: string = "";
    password: string = "";
}

export class MessageFormModel {
    message: string = "";
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
    first_name: string = "";
    second_name: string = "";
    login: string = "";
    email: string = "";
    password: string = "";
    phone: string = "";
}

export class SignupViewFormModel extends SignupFormModel {
    password_repeat: string = "";

    constructor() {
        super();
    }
}

export class ChangePasswordFormModel {
    oldPassword: string = "";
    newPassword: string = "";
}

export class SearchUserFormModel {
    login: string = "";
}

export class ChangePasswordViewFormModel extends ChangePasswordFormModel {
    password_repeat: string = "";
}

export class EditProfileFormModel {
    first_name: string = "";
    second_name: string = "";
    display_name: string = "";
    login: string = "";
    email: string = "";
    phone: string = "";
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
    title: string = "";
}

export class AddDeleteUsersToChatFormModel {
    users: Array<number> = new Array<number>();
    chatId: number;
}
