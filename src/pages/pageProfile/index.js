import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageProfile', tpl);

import backarrowbtn from '../../components/backarrowbtn'
import layoutprofile from '../../layout/profile'

export default (props = {}) => {
	return tpl(props);
}
