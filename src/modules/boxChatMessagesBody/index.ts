import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class boxChatMessagesBody extends Block {
	render() {
		console.log('boxChatMessagesBody render');
		return this.compile(tpl);
	}
}
