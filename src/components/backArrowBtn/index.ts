import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class backArrowBtn extends Block {
	render() {
		console.log('backArrowBtn render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('backArrowBtn', tpl);
//
// export default (props={}) => {
// 	return tpl(props);
// }
