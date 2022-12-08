import {BaseApi} from "./baseApi";
import {ISignupResponse, IUserInfo} from "../services/interfaces";
import {LoginFormModel, SignupFormModel} from "../services/types";

// class LoginRequest {
// }

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

    // post<resolve, reject>(s: string, user: LoginRequest) {
    //     return new Promise(function(resolve, reject) {
    //         resolve("done");
    //
    //         reject(new Error("…")); // игнорируется
    //
    //     });
    // }
}

export default new AuthApi();
