import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutChatContentBox extends Block {
	render() {
		console.log('layoutChatContentBox render');
		return this.compile(tpl);
	}
}

// import boxChatList from '../../modules/boxChatList'
// import profileLinkEdit from '../../components/profileLinkEdit'
//
// Handlebars.registerPartial('layoutChatContentBox', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
