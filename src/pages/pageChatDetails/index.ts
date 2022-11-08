import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class pageChatDetails extends Block {
	render() {
		console.log('pageChatDetails render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageChatDetails', tpl);
//
// import layoutChatSideBox from '../../layout/chatSideBox'
// import layoutChatPage from '../../layout/chatPage'
// import boxChatMessage from '../../modules/boxChatMessage'
// import boxChatHeader from '../../modules/boxChatHeader'
//
// export default (props = {}) => {
// 	return tpl(props);
// }

