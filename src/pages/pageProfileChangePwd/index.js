import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageProfileChangePwd', tpl);

import layoutprofile from '../../layout/profile'
import backarrowbtn from '../../components/backarrowbtn'
import layoutprofileparamsbox from '../../layout/profileparamsbox'
import boxprofileimage from '../../modules/boxprofileimage'
import boxprofilechangepwd from '../../modules/boxprofilechangepwd'
import boxprofilepersoneditbtn from '../../modules/boxprofilepersoneditbtn'

export default (props = {}) => {
	return tpl(props);
}
