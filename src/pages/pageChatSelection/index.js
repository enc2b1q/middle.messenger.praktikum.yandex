import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageChatSelection', tpl);

import layoutChatSideBox from '../../layout/chatSideBox'
import layoutChatPage from '../../layout/chatPage'
import chatEmptyContent from '../../components/chatEmptyContent'

export default (props = {}) => {
	return tpl(props);
}
