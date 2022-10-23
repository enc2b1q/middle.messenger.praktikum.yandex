import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('pageProfileEditPerson', tpl);

import layoutprofile from '../../layout/profile'
import backarrowbtn from '../../components/backarrowbtn'
import layoutprofileparamsbox from '../../layout/profileparamsbox'
import boxprofileimage from '../../modules/boxprofileimage'
import boxprofileeditperson from '../../modules/boxprofileeditperson'
import boxprofilepersoneditbtn from '../../modules/boxprofilepersoneditbtn'

export default (props = {}) => {
	return tpl(props);
}
