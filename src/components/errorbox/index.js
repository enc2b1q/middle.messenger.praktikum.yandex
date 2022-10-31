import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.css';

Handlebars.registerPartial('errorbox', tpl);

import link from '../link';

export default (id, number, text) => {
	return tpl({ id, number, text});
}
