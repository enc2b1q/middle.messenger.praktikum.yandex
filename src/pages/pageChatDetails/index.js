import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageChatDetails', tpl);

import layoutchatsidebox from '../../layout/chatsidebox'
import layoutchatpage from '../../layout/chatpage'
import boxchatmessage from '../../modules/boxchatmessage'
import boxchatheader from '../../modules/boxchatheader'

export default (props = {}) => {
	return tpl(props);
}
