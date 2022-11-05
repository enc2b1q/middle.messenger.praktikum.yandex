import tpl from './error404.hbs';
import './error404.scss';

import layoutEmpty from '../layout/empty'
import pageError from '../pages/pageError';

const props = {
    number: '404',
    text: 'Не туда попали'
};
document.getElementById('root').innerHTML = tpl(props);
