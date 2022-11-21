// import renderDOM from "../utils/renderDOM";
import PageLinks from "../pages/pageLinks";
import Router from "../services/router";
import PageError404 from "../pages/pageError404";


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
    .start();


// renderDOM("#root", _pageLinks);