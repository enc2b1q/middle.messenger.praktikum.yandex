import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class errorBox extends Block{
	render() {
		console.log('errorBox render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('errorBox', tpl);
//
// import link from '../link';
//
// export default (id, number, text) => {
// 	return tpl({ id, number, text});
// }
