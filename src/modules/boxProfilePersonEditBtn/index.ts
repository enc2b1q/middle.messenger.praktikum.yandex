import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxProfilePersonEditBtn extends Block {
	render() {
		console.log('boxProfilePersonEditBtn render');
		return this.compile(tpl);
	}
}

// import button from '../../components/button'
// import profileLinkEdit from '../../components/profileLinkEdit'
//
// Handlebars.registerPartial('boxProfilePersonEditBtn', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
