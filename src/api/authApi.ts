import {BaseApi} from "./baseApi";
import {ISignupResponse, IUserInfo} from "../services/interfaces";
import {LoginFormModel, SignupFormModel} from "../services/types";

class AuthApi extends BaseApi {
    constructor() {
        super("/auth");
    }

    login(data: LoginFormModel) {
        return this.http.post('/signin', data);
    }

    getUserInfo(): Promise<IUserInfo> {
        return this.http.get('/user');
    }

    signup(data: SignupFormModel): Promise<ISignupResponse> {
        return this.http.post('/signup', data);
    }

    logout() {
        return this.http.post('/logout');
    }

}

export default new AuthApi();
