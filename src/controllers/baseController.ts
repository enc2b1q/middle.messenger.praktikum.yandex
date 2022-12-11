import AuthController from "./authController";
import {RejectModel} from "../services/types";

class BaseController {
    testAuth = async () => {
        return AuthController.getUserInfo()
            .then(
                (data) => {
                    return !!data;
                }
            );
    }

    showMessage = (reason: any) => {
        if (reason instanceof RejectModel) {
            alert(`Request failed: status=${reason.status}${reason.reason ? ', message=' + reason.reason : ""}`);
        } else {
            alert(reason);
        }
    };
}

export default new BaseController();
