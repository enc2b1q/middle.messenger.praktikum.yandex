import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class PageProfile extends Block {
	render() {
		console.log('pageProfile render');
		return this.compile(tpl);
	}
}

// Handlebars.registerPartial('pageProfile', tpl);
//
// import layoutProfile from '../../layout/profile'
// import backArrowBtn from '../../components/backArrowBtn'
// import layoutProfileParamsBox from '../../layout/profileParamsBox'
// import boxProfileImage from '../../modules/boxProfileImage'
// import boxProfile from '../../modules/boxProfile'
// import boxProfileBtnsEdit from '../../modules/boxProfileBtnsEdit'
//
// export default (props = {}) => {
// 	return tpl(props);
// }

