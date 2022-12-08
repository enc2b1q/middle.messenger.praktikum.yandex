import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class BoxLoginBtns extends Block {
    render() {
        console.log('boxLoginBtns render');
        return this.compile(tpl);
    }
}

// Handlebars.registerPartial('boxLogin', tpl);
//
// import button from '../../components/button';
// import link from '../../components/link';
// import inputBox from '../../components/inputBox';
//
// export default (props = {}) => {
// 	return tpl(props);
// }

