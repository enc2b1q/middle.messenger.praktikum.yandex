import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class pageError extends Block {
	render() {
		console.log('pageError render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageError', tpl);
//
// import errorBox from '../../components/errorBox';
//
// export default (props = {}) => {
// 	return tpl(props);
// }

