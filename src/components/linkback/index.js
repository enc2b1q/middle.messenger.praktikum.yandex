import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.css';

Handlebars.registerPartial('linkback', tpl);

export default (id, url, text) => {
	return tpl({ id, url, text});
}