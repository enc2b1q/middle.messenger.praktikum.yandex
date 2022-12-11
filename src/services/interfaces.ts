export interface IUserInfo {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface ISignupResponse {
    id: number;
}

export interface ITokenResponse {
    token: string;
}

export interface ILastMessage {
    user: IUserInfo;
    time: string;
    content: string;
}

export interface IChatInfo {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: ILastMessage;
}
