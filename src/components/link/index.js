import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('link', tpl);

export default (id, url, text) => {
	return tpl({ id, url, text});
}
