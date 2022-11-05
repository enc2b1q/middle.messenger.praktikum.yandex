import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('boxProfileChangePwd', tpl);

import profileParamBox from '../../components/profileParamBox'

export default (props = {}) => {
	return tpl(props);
}
