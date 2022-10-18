import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.css';

Handlebars.registerPartial('pageError', tpl);

import errorbox from '../../components/errorbox';

export default (props = {}) => {
	return tpl(props);
}
