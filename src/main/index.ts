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




