import UserApi from "../api/userApi";
import AuthApi from "../api/authApi";
import {IUserInfo} from "../services/interfaces";
import store, {StoreKeys} from "../services/store";
import {sanitize, validationTypedSubmitHandler} from "../utils/processFormData";
import {
    ChangePasswordFormModel,
    ChangePasswordViewFormModel,
    EditProfileFormModel
} from "../services/types";
import BaseController from "./baseController";
import Router from "../services/router";
import Block from "../services/block";
import * as validator from "../utils/processFormData";
import {getFileUrl} from "../utils/getFileUrl";

class UserController {

    async getUser(): Promise<IUserInfo | undefined> {
        let user: IUserInfo | undefined;
        await AuthApi.getUserInfo()
            .then(
                (data) => UserApi.getUser(data.id)
            )
            .then(
                (data) => {
                    user = data;
                }
            )
            .catch(BaseController.showMessage);
        store.set(StoreKeys.user, user);
        return user;
    }

    async changePassword(model: ChangePasswordFormModel) {
        await UserApi.changePassword(model)
            .then(
                () => {
                    BaseController.showMessage('Пароль изменен');
                    const router = new Router("#root");
                    router.go("/settings");
                }
            )
            .catch(BaseController.showMessage);
    }

    async editProfile(model: EditProfileFormModel) {
        await UserApi.editProfile(model)
            .then(
                () => {
                    BaseController.showMessage('Данные изменены');
                }
            )
            .catch(BaseController.showMessage);
    }


    async uploadAvatar(model: FormData) {
        await UserApi.uploadAvatar(model)
            .then(
                () => {
                    BaseController.showMessage('Аватар изменен');
                    const router = new Router("#root");
                    router.go("/settings");
                }
            )
            .catch(BaseController.showMessage);
    }


    async processChangePasswordSubmit(e: SubmitEvent) {
        e.preventDefault();
        const resObj = validationTypedSubmitHandler<ChangePasswordViewFormModel>(e, ChangePasswordViewFormModel);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            if (resObj.object.newPassword != resObj.object.password_repeat) {
                BaseController.showMessage("Новые пароли не совпадают");
                return;
            }

            const dynamicKey = "password_repeat";
            const {[dynamicKey]: _, ...rest} = resObj.object;
            const dataToSend = {...rest} as ChangePasswordFormModel;
            const ctrl = new UserController();
            await ctrl.changePassword(dataToSend);
        } else {
        }

    }

    async processEditProfileSubmit(e: SubmitEvent) {
        e.preventDefault();
        const resObj = validationTypedSubmitHandler<EditProfileFormModel>(e, EditProfileFormModel);
        const canSendDataToLogin = resObj.isValidated;
        if (canSendDataToLogin) {
            const dataToSend = resObj.object;
            const ctrl = new UserController();
            await ctrl.editProfile(dataToSend);
        } else {
        }

    }

    async processUploadAvatarChange(e: Event) {
        e.preventDefault();

        const input = e.target as HTMLInputElement;
        const files = input.files;

        if (!files || !!files && files.length === 0) {
            BaseController.showMessage('Не выбран файл');
            return;
        }
        const file = files[0];
        const formData = new FormData();
        formData.append("avatar", file);

        const ctrl = new UserController();
        await ctrl.uploadAvatar(formData);
    }


    updateUserData(block: Block) {

        const {user} = store.getState();

        (block.getContent().querySelector(`input[name="${validator.propNames.email}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.email, validator.propNames.email);
        (block.getContent().querySelector(`input[name="${validator.propNames.login}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.login, validator.propNames.login);
        (block.getContent().querySelector(`input[name="${validator.propNames.first_name}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.first_name, validator.propNames.first_name);
        (block.getContent().querySelector(`input[name="${validator.propNames.second_name}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.second_name, validator.propNames.second_name);
        (block.getContent().querySelector(`input[name="${validator.propNames.display_name}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.display_name, validator.propNames.display_name);
        (block.getContent().querySelector(`input[name="${validator.propNames.phone}"]`) as HTMLInputElement)!.value = sanitize((user as IUserInfo)?.phone, validator.propNames.phone);

    }
    updateUserImage(block: Block) {
        const {user} = store.getState();
        (block.getContent().querySelector(`.image-self`) as HTMLElement)!.style.backgroundImage = `url('${getFileUrl(sanitize((user as IUserInfo)?.avatar, validator.propNames.avatar))}')`;
    }
    updateUserName(block: Block) {
        const {user} = store.getState();
        (block.getContent().querySelector(`.image-username`) as HTMLElement)!.textContent = sanitize((user as IUserInfo)?.display_name, validator.propNames.display_name) || sanitize((user as IUserInfo)?.first_name, validator.propNames.first_name);
    }



}

export default new UserController();
