import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class Link extends Block {
    render() {
        console.log('link render');
        return this.compile(tpl);
    }

    addEvents() {
        this._element.querySelectorAll('a').forEach(a => {
            if (this._props?.events) {
                Object.entries(this._props.events).forEach(([key, value]) =>
                    a.addEventListener(key, value)
                );
            }
        });
        super.addEvents();
    }
}

export const _linkBackToChatInst = new Link(
    "nav",
    {
        url: '/messenger.html',
        text: 'Назад к чатам',
        attr: {
            class: 'link',
            id: "lnkBackId",
        }
    }
);
