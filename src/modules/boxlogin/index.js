import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('boxlogin', tpl);

import button from '../../components/button';
import link from '../../components/link';
import inputbox from '../../components/inputbox';

export default (props = {}) => {
	return tpl(props);
}
