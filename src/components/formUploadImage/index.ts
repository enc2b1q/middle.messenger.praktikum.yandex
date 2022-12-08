import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class FormUploadImage extends Block {
    render() {
        console.log('formUploadImage render');
        return this.compile(tpl);
    }

    addEvents() {
        this._element.querySelectorAll('.uploadImageFrm').forEach(frm => {
            if (this._props?.events) {
                Object.entries(this._props.events).forEach(([key, value]) =>
                    frm.addEventListener(key, value)
                );
            }
        });
        super.addEvents();
    }
}
