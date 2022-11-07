import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import genericTag from "../genericTag";
import * as validator from "../../utils/processFormData";
import processFormData, {checkInputElement} from "../../utils/processFormData";

export default class profileParamBox extends Block {
	render() {
		console.log('profileParamBox render');
		return this.compile(tpl);
	}
}

export function getNewProfileParamInput(props: { validatorPropName: string, type?: string, className?: string , readonly?: string } ): genericTag {
	const defaultProps = { validatorPropName: "", type: "text", className: "profileParam-input", readonly: ""};
	if(!props) {
		props = defaultProps;
	}

	let attr: {
		type: string,
		id: string,
		name: string,
		class: string,
		pattern?: string,
		title?: string,
		readonly? : string,
		placeholder?: string
	} = {
			type: props.type ?? defaultProps.type,
			id: props.validatorPropName,
			name: props.validatorPropName,
			class: props.className ?? defaultProps.className,
			// pattern: validator.getValidationPatternString(props.validatorPropName),
			// title : validator.getValidationMsg(props.validatorPropName),
			placeholder: "data here",
	};
	if (props.readonly){
		attr["readonly"] = "readonly";
	}
	else {
		attr["pattern"] = validator.getValidationPatternString(props.validatorPropName);
		attr["title"] = validator.getValidationMsg(props.validatorPropName);
	}

	return new genericTag (
		"input",
		{
			attr: attr,
			events: {
				focus: (e: Event) => {
					const target = e.target as HTMLInputElement;
					if(!target) {
						return;
					}
					e.preventDefault();
					if (!attr["readonly"]) {
						checkInputElement(target);
					}

					processFormData();
				},
				blur: (e: Event) => {
					const target = e.target as HTMLInputElement;
					if(!target) {
						return;
					}
					e.preventDefault();
					if (!attr["readonly"]) {
						checkInputElement(target);
					}
					processFormData();
				},
			},
		}
	);
}


// Handlebars.registerPartial('profileParamBox', tpl);
//
// export default (props = {}) => {
// 	return tpl({props});
// }
