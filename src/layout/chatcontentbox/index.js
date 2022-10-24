import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import boxchatlist from '../../modules/boxchatlist'
import profilelinkedit from '../../components/profilelinkedit'

Handlebars.registerPartial('layoutchatcontentbox', tpl);

export default (props = {}) => {
	return tpl(props);
}
