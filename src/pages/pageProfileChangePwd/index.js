import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageProfileChangePwd', tpl);

import layoutProfile from '../../layout/profile'
import backArrowBtn from '../../components/backArrowBtn'
import layoutProfileParamsBox from '../../layout/profileParamsBox'
import boxProfileImage from '../../modules/boxProfileImage'
import boxProfileChangePwd from '../../modules/boxProfileChangePwd'
import boxProfilePersonEditBtn from '../../modules/boxProfilePersonEditBtn'

export default (props = {}) => {
	return tpl(props);
}
