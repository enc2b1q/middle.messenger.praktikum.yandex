import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageRegister', tpl);

import layoutlogin from '../../layout/login'
import boxregister from '../../modules/boxregister';

import button from '../../components/button';
import link from '../../components/link';


export default (props = {}) => {
	return tpl(props);
}
