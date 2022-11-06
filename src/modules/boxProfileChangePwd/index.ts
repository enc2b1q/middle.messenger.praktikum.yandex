import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class boxProfileChangePwd extends Block {
	render() {
		console.log('boxProfileChangePwd render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('boxProfileChangePwd', tpl);
//
// import profileParamBox from '../../components/profileParamBox'
//
// export default (props = {}) => {
// 	return tpl(props);
// }
