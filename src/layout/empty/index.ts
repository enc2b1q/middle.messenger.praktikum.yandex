import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutEmpty extends Block {
    render() {
        console.log('layoutEmpty render');
        return this.compile(tpl);
    }
}
