import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutChatSideBox extends Block {
	render() {
		console.log('layoutChatSideBox render');
		return this.compile(tpl);
	}
}

// import boxChatList from '../../modules/boxChatList'
// import profileLinkEdit from '../../components/profileLinkEdit'
//
// Handlebars.registerPartial('layoutChatSideBox', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
