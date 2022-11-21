// import renderDOM from "../utils/renderDOM";
import PageLinks from "../pages/pageLinks";
import Router from "../services/router";
import PageError404 from "../pages/pageError404";
import PageError5xx from "../pages/pageError5xx";
import PageLogin from "../pages/pageLogin";
import PageRegister from "../pages/pageRegister";
import PageProfile from "../pages/pageProfile";
import PageProfileEditPerson from "../pages/pageProfileEditPerson";
import PageProfileChangePwd from "../pages/pageProfileChangePwd";


const router = new Router("#root");

// const _pageLinks = new PageLinks();

router
    .use("/", PageLinks)
    .use("/index", PageLinks)
    .use("/index.html", PageLinks)
    .use("/links", PageLinks)
    .use("/links.html", PageLinks)
    .use("/error404", PageError404)
    .use("/error404.html", PageError404)
    .use("/error5xx", PageError5xx)
    .use("/error5xx.html", PageError5xx)
    .use("/login", PageLogin)
    .use("/login.html", PageLogin)
    .use("/signIn", PageRegister)
    .use("/signIn.html", PageRegister)
    .use("/profile", PageProfile)
    .use("/profile.html", PageProfile)
    .use("/profileEditPerson", PageProfileEditPerson)
    .use("/profileEditPerson.html", PageProfileEditPerson)
    .use("/profileChangePwd", PageProfileChangePwd)
    .use("/profileChangePwd.html", PageProfileChangePwd)
    .start();


// renderDOM("#root", _pageLinks);