import Block from "../../services/block";
import tpl from './tpl';
import './style.scss';
import GenericTag from "../genericTag";
import * as validator from "../../utils/processFormData";
import {validationInputHandler} from "../../utils/processFormData";

export default class InputBox extends Block {
    render() {
        return this.compile(tpl);
    }
}

export function getNewInput(validatorPropName: string, type = "text", className = "input-with-bottom-line"): GenericTag {
    return new GenericTag(
        "input",
        {
            attr: {
                type: type,
                id: validatorPropName,
                name: validatorPropName,
                class: className,
                title: validator.getValidationMsg(validatorPropName),
            },
            events: {
                focus: validationInputHandler,
                blur: validationInputHandler,
            },
        }
    );
}
