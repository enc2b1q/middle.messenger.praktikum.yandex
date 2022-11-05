import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('boxLogin', tpl);

import button from '../../components/button';
import link from '../../components/link';
import inputBox from '../../components/inputBox';

export default (props = {}) => {
	return tpl(props);
}
