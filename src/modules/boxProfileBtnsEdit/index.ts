import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxProfileBtnsEdit extends Block {
	render() {
		console.log('boxProfileBtnsEdit render');
		return this.compile(tpl);
	}
}

// import profileLinkEdit from '../../components/profileLinkEdit'
//
// Handlebars.registerPartial('boxProfileBtnsEdit', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }

