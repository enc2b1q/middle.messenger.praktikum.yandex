import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class pageProfileEditPerson extends Block {
	render() {
		console.log('pageProfileEditPerson render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageProfileEditPerson', tpl);
//
// import layoutProfile from '../../layout/profile'
// import backArrowBtn from '../../components/backArrowBtn'
// import layoutProfileParamsBox from '../../layout/profileParamsBox'
// import boxProfileImage from '../../modules/boxProfileImage'
// import boxProfileEditPerson from '../../modules/boxProfileEditPerson'
// import boxProfilePersonEditBtn from '../../modules/boxProfilePersonEditBtn'
//
// export default (props = {}) => {
// 	return tpl(props);
// }
