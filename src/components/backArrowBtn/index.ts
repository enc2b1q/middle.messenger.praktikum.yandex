import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BackArrowBtn extends Block {
    render() {
        console.log('backArrowBtn render');
        return this.compile(tpl);
    }
}

