import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageEnter', tpl);

import layoutlogin from '../../layout/login'
import boxlogin from '../../modules/boxlogin';

import button from '../../components/button';
import link from '../../components/link';


export default (props = {}) => {
	return tpl(props);
}
