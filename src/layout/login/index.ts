import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutLogin extends Block {
    render() {
        console.log('layoutLogin render');
        return this.compile(tpl);
    }
}
