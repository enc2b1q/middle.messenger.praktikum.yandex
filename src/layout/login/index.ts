import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class layoutLogin extends Block {
	render() {
		console.log('layoutLogin render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('layoutLogin', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
