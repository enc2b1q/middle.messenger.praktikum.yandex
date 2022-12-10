import PageLinks from "../pages/pageLinks";
import Router from "../services/router";
import PageError404 from "../pages/pageError404";
import PageError5xx from "../pages/pageError5xx";
import PageLogin from "../pages/pageLogin";
import PageRegister from "../pages/pageRegister";
import PageProfile from "../pages/pageProfile";
import PageProfileEditPerson from "../pages/pageProfileEditPerson";
import PageProfileChangePwd from "../pages/pageProfileChangePwd";
import PageChatDetails from "../pages/pageChatDetails";


const router = new Router("#root");

router
    .use("/", PageLogin)
    .use("/index", PageLogin)
    .use("/index.html", PageLogin)
    .use("/links", PageLinks)
    .use("/links.html", PageLinks)
    .use("/error404", PageError404)
    .use("/error404.html", PageError404)
    .use("/error5xx", PageError5xx)
    .use("/error5xx.html", PageError5xx)
    .use("/login", PageLogin)
    .use("/login.html", PageLogin)
    .use("/sign-up", PageRegister)
    .use("/sign-up.html", PageRegister)
    .use("/settings", PageProfile)
    .use("/settings.html", PageProfile)
    .use("/profileEditPerson", PageProfileEditPerson)
    .use("/profileEditPerson.html", PageProfileEditPerson)
    .use("/profileChangePwd", PageProfileChangePwd)
    .use("/profileChangePwd.html", PageProfileChangePwd)
    .use("/messenger", PageChatDetails)
    .use("/messenger.html", PageChatDetails)
    .use("/chatDetails", PageChatDetails)
    .use("/chatDetails.html", PageChatDetails)
    .start();



// renderDOM("#root", _pageLinks);


// import fetchWithRetry from "../utils/fetchWithRetry";

// fetchWithRetry(`/auth/user`, { // Получаем подробную информацию о пользователе и проверяем, что куки проставились
//     method: 'GET',
//     // mode: 'cors',
//     // credentials: 'include',
// })
// .then(data => {
//     console.log('user');
//     console.log(data);
// });

// import AuthController from '../controllers/authController'
// import {IUserInfo} from "../services/interfaces";
//
// let user: IUserInfo | null = null;

// const testAuth = async () => {
//     try {
//         user = await AuthController.getUser();
//         console.log('get user succeeded');
//         return true;
//     } catch (e) {
//         //redirect to main
//         console.log('get user failed:');
//         console.log(e);
//         return false;
//     }
// }

// async function checkUser() {
//     router.go("/");
//
//     // await testAuth().then(
//     //     (isAuth) => {
//     //         console.log('Auth result:');
//     //         console.log(isAuth);
//     //         console.log('user:')
//     //         console.log(user);
//     //
//     //         if (isAuth) {
//     //             // console.log('go to messenger');
//     //             // router.go("/messenger");
//     //             router.go("/settings");
//     //         } else {
//     //             console.log('go to / - auth')
//     //             router.go("/");
//     //         }
//     //
//     //     }
//     // );
//
//     // await instAuthController.getUser()
//     //     .then(response => {
//     //         console.log('response' , response);
//     //     })
//     //     .catch(reason => {
//     //         console.log('reason', reason);
//     //     })
//
// }

// checkUser();


