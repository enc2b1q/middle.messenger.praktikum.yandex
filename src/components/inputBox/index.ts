import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import genericTag from "../genericTag";
import * as validator from "../../utils/processFormData";
import processFormData, {checkInputElement} from "../../utils/processFormData";

export default class inputBox extends Block {
	render() {
		console.log('inputBox render');
		return this.compile(tpl);
	}
}

export function getNewInput(validatorPropName: string, type: string = "text", className: string = "input-with-bottom-line"): genericTag {
	return new genericTag (
		"input",
		{
			attr: {
				type: type,
				id: validatorPropName,
				name: validatorPropName,
				class: className,
				pattern: validator.getValidationPatternString(validatorPropName),
				title : validator.getValidationMsg(validatorPropName),
			},
			events: {
				focus: (e: Event) => {
					const target = e.target as HTMLInputElement;
					if(!target) {
						return;
					}
					e.preventDefault();
					checkInputElement(target);
					processFormData();
				},
				blur: (e: Event) => {
					const target = e.target as HTMLInputElement;
					if(!target) {
						return;
					}
					e.preventDefault();
					checkInputElement(target);
					processFormData();
				},
			},
		}
	);
}

// Handlebars.registerPartial('inputBox', tpl);
//
// export default (props = {}) => {
// 	return tpl({props});
// }
