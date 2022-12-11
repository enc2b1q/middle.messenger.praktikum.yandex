import AuthApi from "../api/authApi";
import {IUserInfo} from "../services/interfaces";
import store, {StoreKeys} from "../services/store";
import {
    validationTypedSubmitHandler
} from "../utils/processFormData";
import {LoginFormModel, SignupFormModel, SignupViewFormModel} from "../services/types";
import Router from "../services/router";
import BaseController from "./baseController";

class AuthController {

    async getUserInfo(): Promise<IUserInfo | undefined> {
        let user: IUserInfo | undefined;
        await AuthApi.getUserInfo()
            .then(
                (data) => {
                    user = data;
                }
            )
            .catch(BaseController.showMessage);
        store.set(StoreKeys.user, user);
        return user;
    }

    async login(model: LoginFormModel) {
        await AuthApi.login(model)
            .then(
                () => {
                    const router = new Router("#root");
                    router.go("/messenger");
                }
            )
            .catch(BaseController.showMessage);
    }

    async signup(model: SignupFormModel) {
        await AuthApi.signup(model)
            .then(
                () => {
                    const router = new Router("#root");
                    router.go("/");
                }
            )
            .catch(BaseController.showMessage);
    }

    async processUserLoginSubmit(e: SubmitEvent) {
        e.preventDefault();
        const resObj = validationTypedSubmitHandler<LoginFormModel>(e, LoginFormModel);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            const ctrl = new AuthController();
            await ctrl.login(resObj.object);
        }

    }

    async processUserLogout(e: Event) {
        e.preventDefault();
        await AuthApi.logout()
            .then(
                () => {
                    const router = new Router("#root");
                    router.go("/")
                })
            .catch(BaseController.showMessage);
    }

    async processUserSignupSubmit(e: SubmitEvent) {
        e.preventDefault();
        const resObj = validationTypedSubmitHandler<SignupViewFormModel>(e, SignupViewFormModel);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            if (resObj.object.password != resObj.object.password_repeat) {
                BaseController.showMessage("Пароли не совпадают");
                return;
            }

            const dynamicKey = "password_repeat";
            let {[dynamicKey]: _, ...rest} = resObj.object;
            let dataToSend = {...rest} as SignupFormModel;
            const ctrl = new AuthController();
            await ctrl.signup(dataToSend);
        }
    }


}

export default new AuthController();
