import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxChatMessagesBody extends Block {
    render() {
        return this.compile(tpl);
    }
}
