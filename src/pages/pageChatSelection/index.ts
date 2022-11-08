import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class PageChatSelection extends Block {
	render() {
		console.log('pageChatSelection render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageChatSelection', tpl);
//
// import layoutChatSideBox from '../../layout/chatSideBox'
// import layoutChatPage from '../../layout/chatPage'
// import chatEmptyContent from '../../components/chatEmptyContent'
//
// export default (props = {}) => {
// 	return tpl(props);
// }

