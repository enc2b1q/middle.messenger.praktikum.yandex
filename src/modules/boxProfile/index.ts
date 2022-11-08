import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxProfile extends Block {
	render() {
		console.log('boxProfile render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('boxProfile', tpl);
//
// import profileParamBox from '../../components/profileParamBox'
//
// export default (props = {}) => {
// 	return tpl(props);
// }
