import tpl from './signIn.hbs';
import './signIn.scss';

import layoutEmpty from '../layout/empty'
import pageRegister from '../pages/pageRegister';

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
