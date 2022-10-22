import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('backarrowbtn', tpl);

export default (props={}) => {
	return tpl(props);
}
