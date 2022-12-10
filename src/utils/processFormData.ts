import {ValidationResult} from "../services/types";
import merge from "./merge";

export enum propNames {
    first_name = 'first_name',
    second_name = 'second_name',
    display_name = 'display_name',
    login = 'login',
    email = 'email',
    password = 'password',
    oldPassword = 'oldPassword',
    newPassword = 'newPassword',
    password_repeat = 'password_repeat',
    phone = 'phone',
    message = 'message',
    avatar = "avatar",
    chatTitle = "chatTitle",
}

const patternNames = /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/;
const patternLogin = /^(?!\d+$)[A-Za-z-_0-9]{3,20}$/;
const patternEmail = /^[A-Za-z0-9-]+@[A-Za-z0-9]+\.[a-z]+$/;
const patternPassword = /^(?=\D*\d)(?=.*[A-Z]).{8,40}$/;
const patternPhone = /^[+0-9]{10,15}$/;
const patternMessage = /.+/;
const patternChatTitle = /^(?!\s*$)[-., 0-9а-яёА-ЯЁa-zA-Z]+$/;

const validationPatternRegExps: Map<string, RegExp> = new Map<string, RegExp>();
validationPatternRegExps.set(propNames.first_name, patternNames);
validationPatternRegExps.set(propNames.second_name, patternNames);
validationPatternRegExps.set(propNames.display_name, patternNames);
validationPatternRegExps.set(propNames.login, patternLogin);
validationPatternRegExps.set(propNames.email, patternEmail);
validationPatternRegExps.set(propNames.password, patternPassword);
validationPatternRegExps.set(propNames.oldPassword, patternPassword);
validationPatternRegExps.set(propNames.newPassword, patternPassword);
validationPatternRegExps.set(propNames.password_repeat, patternPassword);
validationPatternRegExps.set(propNames.phone, patternPhone);
validationPatternRegExps.set(propNames.message, patternMessage);
validationPatternRegExps.set(propNames.avatar, patternMessage);
validationPatternRegExps.set(propNames.chatTitle, patternChatTitle);

const msgPatternNames = 'Допустимо: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
const msgPatternLogin = 'Допустимо: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
const msgPatternEmail = 'Допустимо: латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы';
const msgPatternPassword = 'Допустимо: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
const msgPatternPhone = 'Допустимо: от 10 до 15 символов, состоит из цифр, может начинается с плюса';
const msgPatternMessage = 'Допустимо: не должно быть пустым';
const msgPatternChatTitle = 'Допустимо: русские, английские буквы, цифры с пробелом, точкой, тире';

const validationPatternMessages: Map<RegExp, string> = new Map<RegExp, string>();
validationPatternMessages.set(patternNames, msgPatternNames);
validationPatternMessages.set(patternLogin, msgPatternLogin);
validationPatternMessages.set(patternEmail, msgPatternEmail);
validationPatternMessages.set(patternPassword, msgPatternPassword);
validationPatternMessages.set(patternPhone, msgPatternPhone);
validationPatternMessages.set(patternMessage, msgPatternMessage);
validationPatternMessages.set(patternChatTitle, msgPatternChatTitle);

export function getValidationMsg(name: string): string {
    if (isKeyInPropNames(name)) {
        const regexp = validationPatternRegExps.get(name);
        if (!regexp) {
            throw new Error(`No regExp for ${name}`);
        }
        const regExpMsg = validationPatternMessages.get(regexp);
        if (!regExpMsg) {
            throw new Error(`No regExp msg for ${name}`);
        }
        return regExpMsg;
    } else {
        throw new Error(`No key: ${name} in propNames enum`);
    }
}

function isKeyInPropNames(name: string): name is propNames {
    return (Object.values(propNames) as string[]).includes(name);
}

export function sanitize(value: string | number | null | undefined, name: string): string {
    let result: string = "";

    if (value !== null && value !== undefined) {
        let valStr = value.toString();
        const regExp = validationPatternRegExps.get(name);
        if (regExp) {
            const found = valStr.match(regExp);
            if (found) {
                result = found.map((value1: string) => value1).join("");
            }
        }
    }

    return result;
}

export function checkInputElement(target: HTMLInputElement): void {
    if (!target) {
        return;
    }
    if (!target.readOnly) {
        //NOTE: текст подсказки из title input'а выводится при наведении курсора на поле без внедрения доп. функций.

        const validationResult: boolean = validateItem(target.name, target.value);
        if (validationResult) {
            target.style.backgroundColor = 'white';
        } else {
            target.style.backgroundColor = 'pink';
        }
    }
}

function validateProps(data: { [p: string]: File | string }): boolean {
    const entries = Object.entries(data);
    let res = true;
    entries.forEach(([k, v]) => {
        if (!isString(v)) {
            return false;
        }
        const localRes = validateItem(k, v);
        res &&= localRes;
    })
    return res;
}

//use mapping
export function validateItem(key: string, value: string): boolean {
    if (isKeyInPropNames(key)) {
        const regexp = validationPatternRegExps.get(key);
        if (!regexp) {
            throw new Error(`No regExp for ${key}`);
        }
        return regexp.test(value);
    } else {
        throw new Error(`No key: ${key} in propNames enum`);
    }

}

function isString(value: unknown): value is string {
    return typeof value === 'string';
}


export default function processFormData(form: HTMLFormElement): boolean {

    const formEl: HTMLFormElement = form;
    if (formEl) {
        const inputElementsNL: NodeListOf<Element> = form.querySelectorAll('input');
        if (inputElementsNL) {
            const inputElements = Array.from(inputElementsNL) as HTMLInputElement[];
            if (inputElements) {
                inputElements.forEach(el => checkInputElement(el));
            }
        }
        const data = Object.fromEntries(new FormData(formEl).entries());
        return validateProps(data);

    }
    return false;


}


function checkData<T extends Record<string, any>>(form: HTMLFormElement, type: (new () => T)): ValidationResult<T> {
    let model = new type();

    const target: Record<string, any> = {};

    let typed: T = new type();
    let isValidated = false;
    let returnObject: ValidationResult<T> = new ValidationResult<T>(type);

    const inputElementsNodeList: NodeListOf<Element> = form.querySelectorAll('input');

    if (inputElementsNodeList) {
        let tValidation: boolean | null = null;
        (Array.from(inputElementsNodeList) as HTMLInputElement[]).forEach(inputElement => {

                if (!inputElement) {
                    return;
                }
                if (!inputElement.readOnly) {

                    if (Object.hasOwn(model, inputElement.name)) {
                        let validationItemResult: boolean;

                        if (isString(inputElement.value)) {
                            validationItemResult = validateItem(inputElement.name, inputElement.value);
                            if (validationItemResult) {
                                inputElement.style.backgroundColor = 'white';
                                target[inputElement.name] = inputElement.value;
                            } else {
                                inputElement.style.backgroundColor = 'pink';
                            }
                        } else {
                            validationItemResult = false;
                        }
                        if (tValidation === null) {
                            tValidation = validationItemResult
                        } else {
                            tValidation &&= validationItemResult;
                        }

                    } else {
                        throw new Error(`model of type ${type.name} has not element: ${inputElement.name}`);
                    }

                }
            }
        );
        isValidated = tValidation === true;
        typed = merge(model, target) as T;
    }

    returnObject.isValidated = isValidated;
    returnObject.object = typed;


    return returnObject;
}

export function validationTypedSubmitHandler<T extends Record<string, any>>(e: Event, type: (new () => T)): ValidationResult<T> {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    if (!target) {
        return new ValidationResult<T>(type);
    }
    return checkData<T>(target, type);
}

export function validationSubmitHandler(e: Event) {
    const target = e.target as HTMLFormElement;
    if (!target) {
        return;
    }
    e.preventDefault();
    processFormData(target);

}

export const validationInputHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target) {
        return;
    }
    e.preventDefault();

    if (!target.readOnly) {
        checkInputElement(target);
    }

}
