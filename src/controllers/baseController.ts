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
