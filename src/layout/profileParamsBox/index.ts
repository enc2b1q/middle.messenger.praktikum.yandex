import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class LayoutProfileParamsBox extends Block {
    render() {
        console.log('layoutProfileParamsBox render');
        return this.compile(tpl);
    }
}

// Handlebars.registerPartial('layoutProfileParamsBox', tpl);
//
// export default (props = {}) => {
// 	return tpl(props);
// }
