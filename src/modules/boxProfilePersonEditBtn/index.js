import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import button from '../../components/button'
import profileLinkEdit from '../../components/profileLinkEdit'

Handlebars.registerPartial('boxProfilePersonEditBtn', tpl);

export default (props = {}) => {
	return tpl(props);
}
