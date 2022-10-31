import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('boxprofileeditperson', tpl);

import profileparambox from '../../components/profileparambox'

export default (props = {}) => {
	return tpl(props);
}
