import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageError', tpl);

import errorBox from '../../components/errorBox';

export default (props = {}) => {
	return tpl(props);
}
