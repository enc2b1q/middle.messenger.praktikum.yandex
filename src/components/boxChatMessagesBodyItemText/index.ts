import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxChatMessagesBodyItemText extends Block {
    render() {
        console.log('boxChatMessagesBodyItemText render');
        return this.compile(tpl);
    }
}

// Handlebars.registerPartial('inputBox', tpl);
//
// export default (props = {}) => {
// 	return tpl({props});
// }
