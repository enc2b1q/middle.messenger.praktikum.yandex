import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageRegister', tpl);

import layoutLogin from '../../layout/login'
import boxRegister from '../../modules/boxRegister';

import button from '../../components/button';
import link from '../../components/link';


export default (props = {}) => {
	return tpl(props);
}
