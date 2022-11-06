// import Handlebars from 'handlebars';
import tpl from './tpl';
import './style.scss';
import Block from "../../services/block";

export default class pageRegister extends Block {
	render() {
		console.log('pageRegister render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageRegister', tpl);
//
// import layoutLogin from '../../layout/login'
// import boxRegister from '../../modules/boxRegister';
//
// import button from '../../components/button';
// import link from '../../components/link';
//
//
// export default (props = {}) => {
// 	return tpl(props);
// }
