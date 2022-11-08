import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutChatPage extends Block {
	render() {
		console.log('layoutChatPage render');
		return this.compile(tpl);
	}
}

// import layoutChatContentBox from '../chatContentBox'
// import layoutSideBar from '../sideBar'
//
// Handlebars.registerPartial('layoutChatPage', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
