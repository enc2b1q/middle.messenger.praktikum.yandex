import UserApi from "../api/userApi";
import {IUserInfo} from "../services/interfaces";
import store, {StoreKeys} from "../services/store";
import AuthApi from "../api/authApi";
import {sanitize, validationTypedSubmitHandler} from "../utils/processFormData";
import {
    ChangePasswordFormModel,
    ChangePasswordViewFormModel,
    EditProfileFormModel,
    SearchUserFormModel
} from "../services/types";
import BaseController from "./baseController";
import Router from "../services/router";
import Block from "../services/block";
import * as validator from "../utils/processFormData";
import {getFileUrl} from "../utils/getFileUrl";

class UserController {
    // private userApi: UserApi;
    //
    // constructor() {
    //     this.userApi = new UserApi();
    // }

    async getUser(): Promise<IUserInfo> {
        // UserApi.getUser();
        // // .then(data => store.set('user', data);

        const userAuth: IUserInfo = await AuthApi.getUserInfo();
        const user = await UserApi.getUser(userAuth.id);
        store.set(StoreKeys.user, user);
        return user;
    }

    async searchUser(model: SearchUserFormModel): Promise<IUserInfo[]> {
        return UserApi.searchUser(model);
    }

    async changePassword(model: ChangePasswordFormModel) {
        console.log('UserController.changePassword()')
        await UserApi.changePassword(model)
            .then(
                () => {
                    console.log('success changePassword');
                    console.log('new Password: ', model.newPassword);
                    BaseController.showMessage('Пароль изменен');
                    const router = new Router("#root");
                    router.go("/settings");
                }
            )
            .catch(BaseController.showMessage);
    }

    async editProfile(model: EditProfileFormModel) {
        console.log('UserController.editProfile()')
        await UserApi.editProfile(model)
            .then(
                (data: IUserInfo) => {
                    console.log('success editProfile');
                    console.log('IUserInfo:', data);
                    BaseController.showMessage('Данные изменены');
                    // const router = new Router("#root");
                    // router.go("/settings");
                }
            )
            .catch(BaseController.showMessage);
    }


    async uploadAvatar(model: FormData) {
        console.log('UserController.uploadAvatar()')
        await UserApi.uploadAvatar(model)
            .then(
                (data: IUserInfo) => {
                    console.log('success uploadAvatar');
                    console.log('IUserInfo:', data);
                    BaseController.showMessage('Аватар изменен');
                    const router = new Router("#root");
                    router.go("/settings");
                }
            )
            .catch(BaseController.showMessage);
    }


    async processChangePasswordSubmit(e: SubmitEvent) {
        e.preventDefault();
        console.log('submit: UserController processChangePasswordSubmit');
        const resObj = validationTypedSubmitHandler<ChangePasswordViewFormModel>(e, ChangePasswordViewFormModel);
        console.log(resObj);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            if (resObj.object.newPassword != resObj.object.password_repeat) {
                BaseController.showMessage("Новые пароли не совпадают");
                return;
            }

            const dynamicKey = "password_repeat";
            let {[dynamicKey]: _, ...rest} = resObj.object;
            let dataToSend = {...rest} as ChangePasswordFormModel;
            console.log('can send data to ChangePassword');
            console.log(dataToSend);
            const ctrl = new UserController();
            await ctrl.changePassword(dataToSend);
        } else {
            console.log('can not send Data to Signup Api');
        }

    }

    async processEditProfileSubmit(e: SubmitEvent) {
        e.preventDefault();
        console.log('submit: UserController processEditProfileSubmit');
        const resObj = validationTypedSubmitHandler<EditProfileFormModel>(e, EditProfileFormModel);
        console.log(resObj);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            let dataToSend = resObj.object;
            console.log('can send data to EditProfile');
            console.log(dataToSend);
            const ctrl = new UserController();
            await ctrl.editProfile(dataToSend);
        } else {
            console.log('can not send Data to Signup Api');
        }

    }

    async processUploadAvatarChange(e: Event) {
        e.preventDefault();
        console.log('_avatarInput change');
        console.log(e);

        const input = e.target as HTMLInputElement;
        const files = input.files;
        console.log('files', files);

        if (!files || !!files && files.length === 0) {
            BaseController.showMessage('Не выбран файл');
            return;
        }
        const file = files[0];
        const formData = new FormData();
        formData.append("avatar", file);

        console.log('submit: UserController processUploadAvatarChange');
        const ctrl = new UserController();
        await ctrl.uploadAvatar(formData);
    }


    updateUserData(block: Block) {
        console.log('store: ', store);

        const {user} = store.getState();
        // (block.getContent().querySelector(`.image-username`) as HTMLElement)!.textContent = sanitize((user as IUserInfo)?.display_name, validator.propNames.display_name) || sanitize((user as IUserInfo)?.first_name, validator.propNames.first_name);
        (block.getContent().querySelector(`input[name="${validator.propNames.email}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.email, validator.propNames.email);
        (block.getContent().querySelector(`input[name="${validator.propNames.login}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.login, validator.propNames.login);
        (block.getContent().querySelector(`input[name="${validator.propNames.first_name}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.first_name, validator.propNames.first_name);
        (block.getContent().querySelector(`input[name="${validator.propNames.second_name}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.second_name, validator.propNames.second_name);
        (block.getContent().querySelector(`input[name="${validator.propNames.display_name}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.display_name, validator.propNames.display_name);
        (block.getContent().querySelector(`input[name="${validator.propNames.phone}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.phone, validator.propNames.phone);
        // (block.getContent().querySelector(`.image-self`) as HTMLElement)!.style.backgroundImage = `url('${getFileUrl(sanitize((user as IUserInfo)?.avatar, validator.propNames.avatar))}')`;
    }
    updateUserImage(block: Block) {
        console.log('store: ', store);
        const {user} = store.getState();
        (block.getContent().querySelector(`.image-self`) as HTMLElement)!.style.backgroundImage = `url('${getFileUrl(sanitize((user as IUserInfo)?.avatar, validator.propNames.avatar))}')`;
    }
    updateUserName(block: Block) {
        console.log('store: ', store);
        const {user} = store.getState();
        (block.getContent().querySelector(`.image-username`) as HTMLElement)!.textContent = sanitize((user as IUserInfo)?.display_name, validator.propNames.display_name) || sanitize((user as IUserInfo)?.first_name, validator.propNames.first_name);
    }



}

export default new UserController();