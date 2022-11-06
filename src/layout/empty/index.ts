import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class layoutEmpty extends Block {
	render() {
		console.log('layoutEmpty render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('layoutEmpty', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
