import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxChatList extends Block {
	render() {
		console.log('boxChatList render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('boxChatList', tpl);
//
// import button from '../../components/button';
// import link from '../../components/link';
// import inputBox from '../../components/inputBox';
//
// export default (props = {}) => {
// 	return tpl(props);
// }
