import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import BackArrowBtn from "../../components/backArrowBtn";
import BoxProfileImage from "../../modules/boxProfileImage";
import ProfileParamBox, {getNewProfileParamInput} from "../../components/profileParamBox";
import * as validator from "../../utils/processFormData";
import ProfileLinkEdit from "../../components/profileLinkEdit";
import BoxProfileBtnsEdit from "../../modules/boxProfileBtnsEdit";
import FormProfile from "../../components/formProfile";
import LayoutProfileParamsBox from "../../layout/profileParamsBox";
import LayoutSideBar from "../../layout/sideBar";
import UserController from "../../controllers/userController";
import store, {StoreEvents, StoreKeys} from "../../services/store";
import connect from "../../utils/connect";
import AuthController from "../../controllers/authController";
import BaseController from "../../controllers/baseController";
import Router from "../../services/router";
import FormUploadImage from "../../components/formUploadImage";
import GenericTag from "../../components/genericTag";


const _sideBar = new BackArrowBtn(
    "div",
    {
        url: "/messenger",

        attr: {
            class: "backArrowBtn-parentBox",
        }
    }
);

const _avatarInput = new GenericTag(
    "input",
    {
        attr: {
            type: "file",
            id: "avatar",
            name: "avatar",
            accept: "image/png, image/jpeg",
            style: "display:none",
        },
        events: {
            change: UserController.processUploadAvatarChange
        },
    }
);

const _uploadImageForm = new FormUploadImage(
    "form",
    {

        avatarInput: _avatarInput,

        attr: {
            class: "uploadImageFrm",
            id: "uploadImageForm",
            action: "#",
            method: "POST",
            enctype: "multipart/form-data"
        },

        events: {
            submit: (e: Event) => {
                e.preventDefault();
            },
        },
    }
);

const _profileParams_image_box = new BoxProfileImage(
    "div",
    {
        uploadImageForm: _uploadImageForm,
        username: "name",

        attr: {
            class: "image-outerBox",
        }
    }
);

const _inputProfileEmail = getNewProfileParamInput({
    validatorPropName: validator.propNames.email,
    readonly: "readonly"
});
const _profileParamBoxEmail = new ProfileParamBox(
    "div",
    {
        name: "email",
        labelText: "??????????",
        input: _inputProfileEmail,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileLogin = getNewProfileParamInput({
    validatorPropName: validator.propNames.login,
    readonly: "readonly"
});
const _profileParamBoxLogin = new ProfileParamBox(
    "div",
    {
        name: "login",
        labelText: "??????????",
        input: _inputProfileLogin,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileFirstName = getNewProfileParamInput({
    validatorPropName: validator.propNames.first_name,
    readonly: "readonly"
});
const _profileParamBoxFirstName = new ProfileParamBox(
    "div",
    {
        name: "first_name",
        labelText: "??????",
        input: _inputProfileFirstName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileSecondName = getNewProfileParamInput({
    validatorPropName: validator.propNames.second_name,
    readonly: "readonly"
});
const _profileParamBoxSecondName = new ProfileParamBox(
    "div",
    {
        name: "second_name",
        labelText: "??????????????",
        input: _inputProfileSecondName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfileDisplayName = getNewProfileParamInput({
    validatorPropName: validator.propNames.display_name,
    readonly: "readonly"
});
const _profileParamBoxDisplayName = new ProfileParamBox(
    "div",
    {
        name: "display_name",
        labelText: "?????? ?? ????????",
        input: _inputProfileDisplayName,

        attr: {
            class: "profileParamBox",
        }
    }
);

const _inputProfilePhone = getNewProfileParamInput({
    validatorPropName: validator.propNames.phone,
    readonly: "readonly"
});
const _profileParamBoxPhone = new ProfileParamBox(
    "div",
    {
        name: "phone",
        labelText: "??????????????",
        input: _inputProfilePhone,

        attr: {
            class: "profileParamBox",
        }
    }
);


const _profileLinkEditPersonEdit = new ProfileLinkEdit(
    "nav",
    {
        url: "/profileEditPerson",
        profileLinkEdit_color_class: "profileLinkEdit_a_blue",
        linkText: "???????????????? ????????????",

        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_start",
        }
    }
);
const _profileLinkEditChangePwd = new ProfileLinkEdit(
    "nav",
    {
        url: "/profileChangePwd",
        profileLinkEdit_color_class: "profileLinkEdit_a_blue",
        linkText: "???????????????? ????????????",

        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_start",
        }
    }
);
const _profileLinkEditLogin = new ProfileLinkEdit(
    "nav",
    {
        url: "/login",
        profileLinkEdit_color_class: "profileLinkEdit_a_red",
        linkText: "??????????",
        events: {
            click: AuthController.processUserLogout,
        },
        attr: {
            class: "profileLinkEdit profileLinkEdit_text_align_start",
        }
    }
);

const _profileParams_buttons_box = new BoxProfileBtnsEdit(
    "div",
    {
        profileLinkEditArray: [
            _profileLinkEditPersonEdit,
            _profileLinkEditChangePwd,
            _profileLinkEditLogin
        ],

        attr: {
            class: "profileBox-btns-outerBox",
        }
    }
);

const _formProfile = new FormProfile(
    "form",
    {
        profileParams_params_box: [
            _profileParamBoxEmail,
            _profileParamBoxLogin,
            _profileParamBoxFirstName,
            _profileParamBoxSecondName,
            _profileParamBoxDisplayName,
            _profileParamBoxPhone
        ],
        profileParams_buttons_box: _profileParams_buttons_box,

        attr: {
            class: "layout_profileParams_form",
            id: "form",
            action: "#",
            method: "POST",
        },

        events: {
            submit: (e: Event) => {
                e.preventDefault();
            },
        },
    }
);

const _sideBarContent = new LayoutProfileParamsBox(
    "div",
    {
        profileParams_image_box: _profileParams_image_box,
        formProfile: _formProfile,

        attr: {
            class: "layout_profileParams_outer_box",
        }
    }
);

const _layoutSideBar = new LayoutSideBar(
    "div",
    {
        sideBar: _sideBar,
        sideBarContent: _sideBarContent,

        sizeClass: "sideBar-small",
        attr: {
            class: "container",
        }
    }
);

class PageProfile extends Block {
    constructor() {
        super("div", {
            content: _layoutSideBar,
            attr: {
                class: "mainContent",
            },
        });

        store.subscribe(StoreEvents.UPDATED, () => {
            this.setProps(store.getState());
        });

    }

    componentDidMount() {

        BaseController.testAuth()
            .then(
                (isAuth) => {
                    if (isAuth) {
                        UserController
                            .getUser()
                            .then(
                                (user) => {
                                    if (user) {
                                        this._updateUserData();
                                    }
                                }
                            )
                            .catch(BaseController.showMessage);
                    } else {
                        const router = new Router("#root");
                        router.go("/");
                    }
                }
            );

    }

    private _updateUserData() {
        UserController.updateUserImage(this);
        UserController.updateUserData(this);
        UserController.updateUserName(this);
    }

    render() {
        return this.compile(tpl);
    }
}

export default connect(
    (state) => ({
        user: state[StoreKeys.user] || ''
    })
)(PageProfile);
