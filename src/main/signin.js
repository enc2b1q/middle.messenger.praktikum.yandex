import tpl from './signin.hbs';
import './signin.scss';

import layoutempty from '../layout/empty'
import pageRegister from '../pages/pageRegister';

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
