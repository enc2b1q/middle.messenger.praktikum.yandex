import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxLoginBtns extends Block {
    render() {
        return this.compile(tpl);
    }
}
