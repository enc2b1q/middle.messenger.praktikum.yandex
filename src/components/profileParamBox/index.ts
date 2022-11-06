import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class profileParamBox extends Block {
	render() {
		console.log('profileParamBox render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('profileParamBox', tpl);
//
// export default (props = {}) => {
// 	return tpl({props});
// }
