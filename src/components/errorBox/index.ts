import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class ErrorBox extends Block {
    render() {
        console.log('errorBox render');
        return this.compile(tpl);
    }
}
