import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxChatMessage extends Block {
    render() {
        console.log('boxChatMessage render');
        return this.compile(tpl);
    }
}

// Handlebars.registerPartial('boxChatMessage', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }

