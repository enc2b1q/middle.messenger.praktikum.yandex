import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class PageError extends Block {
    render() {
        console.log('pageError render');
        return this.compile(tpl);
    }
}
