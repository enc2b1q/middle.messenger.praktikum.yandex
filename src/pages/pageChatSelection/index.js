import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageChatSelection', tpl);

import layoutchatsidebox from '../../layout/chatsidebox'
import layoutchatpage from '../../layout/chatpage'
import chatemptycontent from '../../components/chatemptycontent'

export default (props = {}) => {
	return tpl(props);
}
