import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('backArrowBtn', tpl);

export default (props={}) => {
	return tpl(props);
}
