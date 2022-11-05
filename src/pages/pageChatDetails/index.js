import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageChatDetails', tpl);

import layoutChatSideBox from '../../layout/chatSideBox'
import layoutChatPage from '../../layout/chatPage'
import boxChatMessage from '../../modules/boxChatMessage'
import boxChatHeader from '../../modules/boxChatHeader'

export default (props = {}) => {
	return tpl(props);
}
