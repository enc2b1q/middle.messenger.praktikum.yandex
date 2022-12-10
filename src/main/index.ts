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
    .use("/links", PageLinks)
    .use("/error404", PageError404)
    .use("/error5xx", PageError5xx)
    .use("/login", PageLogin)
    .use("/sign-up", PageRegister)
    .use("/settings", PageProfile)
    .use("/profileEditPerson", PageProfileEditPerson)
    .use("/profileChangePwd", PageProfileChangePwd)
    .use("/messenger", PageChatDetails)
    .use("/chatDetails", PageChatDetails)
    .start();




