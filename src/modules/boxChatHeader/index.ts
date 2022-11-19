import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxChatHeader extends Block {
	render() {
		console.log('boxChatHeader render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('boxChatHeader', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
