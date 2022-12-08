// import LoginApi from "../api/loginApi";
// import {LoginFormModel} from '../services/types'
// import Router from "../services/router";
//
// const loginApi = new LoginApi();
// const userLoginValidator = validateLoginFields(validateRules);
//
// class UserLoginController {
//     public async login(data: LoginFormModel) {
//         try {
//             // Запускаем крутилку
//
//             const validateData = userLoginValidator(data);
//
//             if (!validateData.isCorrect) {
//                 throw new Error(validateData);
//             }
//
//             const userId = loginApi.request(prepareDataToRequest(data));
//             Router.go('/chats');
//
//             // Останавливаем крутилку
//         } catch (error) {
//             // Логика обработки ошибок
//         }
//     }
// }

// class UserLoginController {
//     @validate(userLoginValidateRules)
//     @handleError(handler)
//     public async login(data: LoginFormModel) {
//         const userID = loginApi.request(prepareDataToRequest(data));
//         Router.go('/chats');
//     }
// }
