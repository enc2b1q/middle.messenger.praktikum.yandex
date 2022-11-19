import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class GenericTag extends Block {
	render() {
		console.log('genericTag render');
		return this.compile(tpl);
	}
}
