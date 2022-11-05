import tpl from './login.hbs';
import './login.scss';

import layoutEmpty from '../layout/empty'
import pageEnter from '../pages/pageEnter';

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
