import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';

export default class ProfileLinkEdit extends Block {
    render() {
        console.log('profileLinkEdit render');
        return this.compile(tpl);
    }
}

// Handlebars.registerPartial('profileLinkEdit', tpl);
//
// export default (props = {}) => {
// 	return tpl({props});
// }
