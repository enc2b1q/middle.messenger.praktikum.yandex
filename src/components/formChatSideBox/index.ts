import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import {validationSubmitHandler} from "../../utils/processFormData";

export default class FormChatSideBox extends Block {
    render() {
        return this.compile(tpl);
    }

    addEvents() {
        this._element.querySelectorAll('form').forEach(frm => {
            if (this._props?.events) {
                Object.entries(this._props.events).forEach(([key, value]) =>
                    frm.addEventListener(key, value)
                );
            }
        });
        super.addEvents();
    }
}

export const formChatSideBoxInst = new FormChatSideBox(
    "form",
    {
        events: {
            submit: validationSubmitHandler,
        },

        attr: {
            class: "layout_chatSideBox_searchBox_form",
            id: "form",
            action: "#",
            method: "POST",
        }
    }
);
