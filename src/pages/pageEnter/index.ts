import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class pageEnter extends Block {
	render() {
		console.log('pageEnter render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageEnter', tpl);
//
// import layoutLogin from '../../layout/login'
// import boxLogin from '../../modules/boxLogin';
//
// import button from '../../components/button';
// import link from '../../components/link';
//
//
// export default (props = {}) => {
// 	return tpl(props);
// }
