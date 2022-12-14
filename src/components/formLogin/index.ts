import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class FormLogin extends Block {
    render() {
        return this.compile(tpl);
    }

    addEvents() {
        this._element.querySelectorAll('.layout-login-form').forEach(frm => {
            if (this._props?.events) {
                Object.entries(this._props.events).forEach(([key, value]) =>
                    frm.addEventListener(key, value)
                );
            }
        });
        super.addEvents();
    }
}
