import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import button from '../../components/button'
import profilelinkedit from '../../components/profilelinkedit'

Handlebars.registerPartial('boxprofilepersoneditbtn', tpl);

export default (props = {}) => {
	return tpl(props);
}
