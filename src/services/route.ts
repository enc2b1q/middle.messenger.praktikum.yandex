import Block from "./block";
import {TypeDictRootQuery} from "./types";
import renderDOM from "../utils/renderDOM";

function isEqual(lhs:string, rhs:string) {
    return lhs === rhs;
}

class Route {
    _pathname: string;
    _blockClass: typeof Block;
    _props: TypeDictRootQuery;
    _block: Block | null;

    constructor(pathname: string, view: typeof Block, props: TypeDictRootQuery) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname:string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            renderDOM(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export default Route;
