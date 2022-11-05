import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageProfile', tpl);

import layoutProfile from '../../layout/profile'
import backArrowBtn from '../../components/backArrowBtn'
import layoutProfileParamsBox from '../../layout/profileParamsBox'
import boxProfileImage from '../../modules/boxProfileImage'
import boxProfile from '../../modules/boxProfile'
import boxProfileBtnsEdit from '../../modules/boxProfileBtnsEdit'

export default (props = {}) => {
	return tpl(props);
}
