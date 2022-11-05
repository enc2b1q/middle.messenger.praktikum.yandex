import tpl from './test.hbs';
import './test.scss';

import layoutempty from '../layout/empty'
import pageEnter from '../pages/pageEnter';

const props = {
};
document.getElementById('root').innerHTML = tpl(props);
