import AuthController from "./authController";
import {RejectModel} from "../services/types";

class BaseController {
    testAuth = async () => {
        try {
            await AuthController.getUserInfo();
            console.log('get user succeeded');
            return true;
        } catch (e) {
            console.log('get user failed:');
            console.log(e);
            return false;
        }
    }

    showMessage = (reason: any) => {
        console.log(reason);
        if (reason instanceof RejectModel) {
            console.log(reason.status);
            console.log(reason.reason);
            console.log(reason.sourceBody);
            alert(`Request failed: status=${reason.status}${reason.reason ? ', message=' + reason.reason : ""}`);
        } else {
            alert(reason);
        }
    };
}

export default new BaseController();
