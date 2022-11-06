import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class boxProfileImage extends Block {
	render() {
		console.log('boxProfileImage render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('boxProfileImage', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
