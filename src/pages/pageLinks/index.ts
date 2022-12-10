import "./style.scss";

import tpl from "./tpl";
import BoxLinks from "../../modules/boxLinks";
import Block from "../../services/block";

const _content = new BoxLinks(
    "nav",
    {

        attr: {
            class: "pageContainer",
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
        return this.compile(tpl);
    }
}
