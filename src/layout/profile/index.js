import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import layoutSideBar from '../sideBar';

Handlebars.registerPartial('layoutProfile', tpl);

export default (props = {}) => {
	return tpl(props);
}
