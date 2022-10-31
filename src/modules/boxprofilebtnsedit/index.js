import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import profilelinkedit from '../../components/profilelinkedit'

Handlebars.registerPartial('boxprofilebtnsedit', tpl);

export default (props = {}) => {
	return tpl(props);
}
