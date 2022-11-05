import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import profileLinkEdit from '../../components/profileLinkEdit'

Handlebars.registerPartial('boxProfileBtnsEdit', tpl);

export default (props = {}) => {
	return tpl(props);
}
