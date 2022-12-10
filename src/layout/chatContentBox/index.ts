import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutChatContentBox extends Block {
    render() {
        console.log('layoutChatContentBox render');
        return this.compile(tpl);
    }
}
