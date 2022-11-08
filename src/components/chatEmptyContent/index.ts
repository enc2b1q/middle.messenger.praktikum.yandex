import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class ChatEmptyContent extends Block {
	render() {
		console.log('chatEmptyContent render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('chatEmptyContent', tpl);
//
// export default (props={}) => {
// 	return tpl(props);
// }
