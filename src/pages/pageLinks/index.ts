import "./style.scss";

import tpl from "./tpl";
// import renderDOM from "../../utils/renderDOM";
import BoxLinks from "../../modules/boxLinks";
import Block from "../../services/block";

const _content = new BoxLinks(
    "nav",
    {

        attr: {
            class: "container",
        }
    }
);

export default class PageLinks extends Block {
    constructor() {
        super("div", {
            content:_content,
            attr: {
                class: "mainContent",
            }
        } );
    }

    render() {
        console.log('PageLinks render');
        return this.compile(tpl);
    }
}

// renderDOM("#root", _layoutEmpty);
