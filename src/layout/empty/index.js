import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.css';

Handlebars.registerPartial('layoutempty', tpl);

export default (props = {}) => {
	return tpl(props);
}
