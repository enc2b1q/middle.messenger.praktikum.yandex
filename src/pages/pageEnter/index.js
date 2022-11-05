import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageEnter', tpl);

import layoutLogin from '../../layout/login'
import boxLogin from '../../modules/boxLogin';

import button from '../../components/button';
import link from '../../components/link';


export default (props = {}) => {
	return tpl(props);
}
