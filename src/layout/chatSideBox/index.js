import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

import boxChatList from '../../modules/boxChatList'
import profileLinkEdit from '../../components/profileLinkEdit'

Handlebars.registerPartial('layoutChatSideBox', tpl);

export default (props = {}) => {
	return tpl(props);
}
