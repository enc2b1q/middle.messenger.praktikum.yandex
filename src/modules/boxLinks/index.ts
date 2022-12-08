import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxLinks extends Block {
    render() {
        console.log('BoxLinks render');
        return this.compile(tpl);
    }
}
