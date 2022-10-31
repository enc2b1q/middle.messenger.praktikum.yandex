import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageProfile', tpl);

import layoutprofile from '../../layout/profile'
import backarrowbtn from '../../components/backarrowbtn'
import layoutprofileparamsbox from '../../layout/profileparamsbox'
import boxprofileimage from '../../modules/boxprofileimage'
import boxprofile from '../../modules/boxprofile'
import boxprofilebtnsedit from '../../modules/boxprofilebtnsedit'

export default (props = {}) => {
	return tpl(props);
}
