import Block from "./block";
import Route from "./route";
import PageError404 from "../pages/pageError404";

class Router {
    static __instance: Router;

    routes: Array<Route>;
    history: History;
    _currentRoute: Route | null;
    _rootQuery: string;

    get path404(): string {
        return "/error404.html";
    }
    get page404() {
        return PageError404;
    }

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        this.use(this.path404, this.page404);

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = event => {
            const pathname = event.currentTarget instanceof Window ? event.currentTarget.location.pathname : undefined;
            if (pathname) {
                this._onRoute(pathname);
            }
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            this.go(this.path404);
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        console.log('going to path: ', pathname);
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;
