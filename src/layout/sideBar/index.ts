import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutSideBar extends Block {
	render() {
		console.log('layoutSideBar render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('layoutSideBar', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
