import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxProfileBtnsEdit extends Block {
    render() {
        console.log('boxProfileBtnsEdit render');
        return this.compile(tpl);
    }
}
