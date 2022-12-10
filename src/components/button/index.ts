import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class Button extends Block {
    render() {
        return this.compile(tpl);
    }

    addEvents() {
        this._element.querySelectorAll('.button').forEach(el => {
            if (this._props?.events) {
                Object.entries(this._props.events).forEach(([key, value]) =>
                    el.addEventListener(key, value)
                );
            }
        });
        super.addEvents();
    }
}

export const boxProfilePersonEditBtnSaveBts = new Button(
    "button",
    {
        text: "Сохранить",
        attr: {
            id: "btnSaveId",
            type: "submit",
            class: "button",
        },

    }
);
