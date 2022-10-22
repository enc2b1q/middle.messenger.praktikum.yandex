import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageChatSelection', tpl);

import layoutchatpage from '../../layout/chatpage'

export default (props = {}) => {
	return tpl(props);
}
