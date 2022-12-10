import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxProfileEditPerson extends Block {
    render() {
        return this.compile(tpl);
    }
}
