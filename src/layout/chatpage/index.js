import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import layoutsidebar from '../sidebar'

Handlebars.registerPartial('layoutchatpage', tpl);

export default (props = {}) => {
	return tpl(props);
}
