import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxLogin extends Block {
    render() {
        console.log('boxLogin render');
        return this.compile(tpl);
    }
}
