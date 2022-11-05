import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('chatEmptyContent', tpl);

export default (props={}) => {
	return tpl(props);
}
