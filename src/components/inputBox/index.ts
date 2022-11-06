import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class inputBox extends Block {
	render() {
		console.log('inputBox render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('inputBox', tpl);
//
// export default (props = {}) => {
// 	return tpl({props});
// }
