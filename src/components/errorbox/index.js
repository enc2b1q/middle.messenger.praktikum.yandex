import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.css';

Handlebars.registerPartial('errorbox', tpl);

import linkback from '../linkback';

export default (id, number, text) => {
	return tpl({ id, number, text});
}
