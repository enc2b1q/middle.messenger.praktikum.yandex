// import renderDOM from "../utils/renderDOM";
import PageLinks from "../pages/pageLinks";
import Router from "../services/router";


const router = new Router("#root");

// const _pageLinks = new PageLinks();

router
    .use("/", PageLinks)
    .use("/index", PageLinks)
    .use("/index.html", PageLinks)
    .use("/links", PageLinks)
    .use("/links.html", PageLinks)
    .start();


// renderDOM("#root", _pageLinks);