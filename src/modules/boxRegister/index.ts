import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxRegister extends Block {
    render() {
        console.log('boxRegister render');
        return this.compile(tpl);
    }
}
