import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class pageProfileChangePwd extends Block {
	render() {
		console.log('pageProfileChangePwd render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageProfileChangePwd', tpl);
//
// import layoutProfile from '../../layout/profile'
// import backArrowBtn from '../../components/backArrowBtn'
// import layoutProfileParamsBox from '../../layout/profileParamsBox'
// import boxProfileImage from '../../modules/boxProfileImage'
// import boxProfileChangePwd from '../../modules/boxProfileChangePwd'
// import boxProfilePersonEditBtn from '../../modules/boxProfilePersonEditBtn'
//
// export default (props = {}) => {
// 	return tpl(props);
// }
