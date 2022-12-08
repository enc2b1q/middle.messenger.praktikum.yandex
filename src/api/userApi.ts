import {BaseApi} from "./baseApi";
import {IUserInfo} from "../services/interfaces";
import {ChangePasswordFormModel, EditProfileFormModel, SearchUserFormModel} from "../services/types";


class UserApi extends BaseApi {
    constructor() {
        super("/user");
    }

    getUser(id: string | number): Promise<IUserInfo> {
        return this.http.get(`/${id}`);
    }

    changePassword(data: ChangePasswordFormModel) {
        return this.http.put('/password', data);
    }

    searchUser(data: SearchUserFormModel): Promise<IUserInfo[]> {
        return this.http.post('/search', data);
    }

    editProfile(data: EditProfileFormModel): Promise<IUserInfo> {
        return this.http.put('/profile', data);
    }

    uploadAvatar(data: FormData): Promise<IUserInfo> {
        return this.http.put('/profile/avatar', data);
    }

}

export default new UserApi();
