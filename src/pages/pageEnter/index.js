import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageEnter', tpl);

import button from '../../components/button';
import link from '../../components/link';

import boxlogin from '../../modules/boxlogin';

export default (props = {}) => {
	return tpl(props);
}
