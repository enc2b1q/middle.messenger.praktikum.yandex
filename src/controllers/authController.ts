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


    // private authApi: AuthApi;
    //
    // constructor() {
    //     this.authApi = new AuthApi();
    // }

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
        console.log('AuthController.login()')
        await AuthApi.login(model)
            .then(
                () => {
                    console.log('success auth');
                    const router = new Router("#root");
                    router.go("/messenger");
                    // router.go("/settings");
                }
            )
            .catch(BaseController.showMessage);
    }

    async signup(model: SignupFormModel) {
        console.log('AuthController.signup()')
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
        console.log('submit: AuthController processUserLoginSubmit');
        const resObj = validationTypedSubmitHandler<LoginFormModel>(e, LoginFormModel);
        console.log(resObj);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            console.log('canSendDataToLogin');
            console.log(resObj.object);
            //todo: auth controller => login api
            const ctrl = new AuthController();
            await ctrl.login(resObj.object);
            //send form data as object
        } else {
            console.log('can not send Data to Login Api');
        }

        // e.preventDefault();
        // const target = e.target as HTMLFormElement;
        // if (!target) {
        //     return false;
        // }
        // //validationSubmitHandler
        // let data = {} as LoginFormModel;
        // console.log('let data = {} as LoginFormModel;', data);
        // const canSendDataToLogin = processFormData<LoginFormModel>(target, data);
        // if (canSendDataToLogin) {
        //     //todo: auth controller => login api
        //     console.log('canSendDataToLogin');
        //     //get form data as object
        //     //send form data as object
        // } else {
        //     console.log('can not send Data to Login Api');
        // }
    }

    async processUserLogout(e: Event) {
        e.preventDefault();
        console.log('click AuthController.processUserLogout');
        await AuthApi.logout()
            .then(
                () => {
                    console.log('success logout');
                    const router = new Router("#root");
                    router.go("/")
                })
            .catch(BaseController.showMessage);
    }

    async processUserSignupSubmit(e: SubmitEvent) {
        e.preventDefault();
        console.log('submit: AuthController processUserSignupSubmit');
        const resObj = validationTypedSubmitHandler<SignupViewFormModel>(e, SignupViewFormModel);
        console.log(resObj);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            if (resObj.object.password != resObj.object.password_repeat) {
                BaseController.showMessage("Пароли не совпадают");
                return;
            }

            const dynamicKey = "password_repeat";
            let {[dynamicKey]: _, ...rest} = resObj.object;
            let dataToSend = {...rest} as SignupFormModel;
            console.log('can Send Data To Signup');
            console.log(dataToSend);
            const ctrl = new AuthController();
            await ctrl.signup(dataToSend);
        } else {
            console.log('can not send Data to Signup Api');
        }
    }


}

export default new AuthController();
