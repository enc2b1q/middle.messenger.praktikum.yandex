// export const first_name: string = 'first_name';
// export const second_name: string = 'second_name';
// export const display_name: string = 'display_name';
// export const login: string = 'login';
// export const email: string = 'email';
// export const password: string = 'password';
// export const oldPassword: string = 'oldPassword';
// export const newPassword: string = 'newPassword';
// export const password_repeat: string = 'password_repeat';
// export const phone: string = 'phone';
// export const message: string = 'message';

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

// const validationMsgs: Map<string, string> = new Map<string, string>();
// validationMsgs.set(propNames.first_name, msgPatternNames);
// validationMsgs.set(propNames.second_name, msgPatternNames);
// validationMsgs.set(propNames.display_name, msgPatternNames);
// validationMsgs.set(propNames.login, msgPatternLogin);
// validationMsgs.set(propNames.email, msgPatternEmail);
// validationMsgs.set(propNames.password, msgPatternPassword);
// validationMsgs.set(propNames.oldPassword, msgPatternPassword);
// validationMsgs.set(propNames.newPassword, msgPatternPassword);
// validationMsgs.set(propNames.password_repeat, msgPatternPassword);
// validationMsgs.set(propNames.phone, msgPatternPhone);
// validationMsgs.set(propNames.message, msgPatternMessage);

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
        // return validationMsgs.get(name) ?? "";
    } else {
        throw new Error(`No key: ${name} in propNames enum`);
    }
}

function isKeyInPropNames(name: string): name is propNames {
    return (Object.values(propNames) as string[]).includes(name);
}

export function sanitize(value: string | number | null | undefined, name: string): string {
    let result: string = "";
    console.log(`sanitize for ${name}: `, value);

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

    console.log(`sanitize result: ${result}`);
    return result;
}

export function checkInputElement(target: HTMLInputElement): void {
    if (!target) {
        return;
    }
    if (!target.readOnly) {
        //NOTE: текст подсказки из title input'а выводится при наведении курсора на поле без внедрения доп. функций.

        // const el: HTMLElement = document.querySelector(`[for="${target.name}"].validation`) as HTMLElement;
        // console.log(el);
        const validationResult: boolean = validateItem(target.name, target.value);
        console.log(`validation of ${target.name}: ${validationResult}`);
        if (validationResult) {
            target.style.backgroundColor = 'white';
            // if (el) {
            //     el.textContent = "";
            //     el.classList.remove(`validation_active`);
            // }
        } else {
            target.style.backgroundColor = 'pink';
            // if (el) {
            //     el.textContent = target.title;
            //     el.classList.add(`validation_active`);
            // }
        }
    }
}

function validateProps(data: { [p: string]: File | string }): boolean {
    const entries = Object.entries(data);
    let res = true;
    entries.forEach(([k, v]) => {
        if (!isString(v)) {
            console.log(`validation of ${k}: false <== file`);
            return false;
        }
        const localRes = validateItem(k, v);
        console.log(`validation of ${k}: ${localRes}`);
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

    // if (key === propNames.first_name || key === propNames.second_name || key === propNames.display_name) {
    //     return patternNames.test(value);
    // } else if (key === propNames.login) {
    //     return patternLogin.test(value);
    // } else if (key === propNames.email) {
    //     return patternEmail.test(value);
    // } else if (key === propNames.password || key === propNames.password_repeat || key === propNames.oldPassword || key === propNames.newPassword) {
    //     return patternPassword.test(value);
    // } else if (key === propNames.phone) {
    //     return patternPhone.test(value);
    // } else if (key === propNames.message) {
    //     return patternMessage.test(value);
    // } else {
    //     return true;
    // }
}

function isString(value: unknown): value is string {
    return typeof value === 'string';
}


export default function processFormData(form: HTMLFormElement): boolean {
    console.log('processFormData, form:', form);

    // const formEl: HTMLFormElement = document.querySelector('#form') as HTMLFormElement;
    const formEl: HTMLFormElement = form;
    if (formEl) {
        // const inputElementsNL: NodeListOf<Element> = document.querySelectorAll('#form input');
        const inputElementsNL: NodeListOf<Element> = form.querySelectorAll('input');
        console.log("processFormData inputElementsNL:", inputElementsNL);
        if (inputElementsNL) {
            const inputElements = Array.from(inputElementsNL) as HTMLInputElement[];
            if (inputElements) {
                inputElements.forEach(el => checkInputElement(el));
            }
        }
        //write to console
        const data = Object.fromEntries(new FormData(formEl).entries());
        // console.log(data);
        const isValidated = validateProps(data);
        if (!isValidated) {
            return false;
        }
        //sendData() //fetchWithRetry
        return true;
    }
    return false;


}


function checkData<T extends Record<string, any>>(form: HTMLFormElement, type: (new () => T)): ValidationResult<T> {
    let model = new type();
    // console.log(model);
    const target: Record<string, any> = {};

    const keys = Object.keys(model);
    console.log('keys:', keys);

    let typed: T = new type();
    let isValidated = false;
    let returnObject: ValidationResult<T> = new ValidationResult<T>(type);

    const inputElementsNodeList: NodeListOf<Element> = form.querySelectorAll('input');
    // console.log('input Node List:', inputElementsNodeList);
    if (inputElementsNodeList) {
        let tValidation: boolean | null = null;
        (Array.from(inputElementsNodeList) as HTMLInputElement[]).forEach(inputElement => {
                // console.log('inputElement:', inputElement);
                if (!inputElement) {
                    return;
                }
                if (!inputElement.readOnly) {
                    // console.log('inputElement.name = ', inputElement.name);
                    // console.log('inputElement.value = ', inputElement.value);
                    if (Object.hasOwn(model, inputElement.name)) {
                        let validationItemResult: boolean;
                        // console.log('model has element', inputElement.name);
                        if (isString(inputElement.value)) {
                            validationItemResult = validateItem(inputElement.name, inputElement.value);
                            console.log(`validation of item=${inputElement.name} with value=${inputElement.value}: ${validationItemResult}`);
                            if (validationItemResult) {
                                inputElement.style.backgroundColor = 'white';
                                target[inputElement.name] = inputElement.value;
                                console.log(`target[${inputElement.name}]=${inputElement.value}`);
                            } else {
                                inputElement.style.backgroundColor = 'pink';
                            }
                        } else {
                            console.log(`validation of item ${inputElement.name}: false <== file`);
                            validationItemResult = false;
                        }
                        if (tValidation === null) {
                            tValidation = validationItemResult
                        } else {
                            tValidation &&= validationItemResult;
                        }

                    } else {
                        console.log('model has not element:', inputElement.name);
                        throw new Error(`model of type ${type.name} has not element: ${inputElement.name}`);
                    }
                    // console.log('model:', model);
                    // console.log('target:', target);
                }
            }
        );
        isValidated = tValidation === true;
        typed = merge(model, target) as T;
        console.log('typed:', typed);
    }

    returnObject.isValidated = isValidated;
    returnObject.object = typed;

    console.log('returnObject: ', returnObject);

    return returnObject;
}

export function validationTypedSubmitHandler<T extends Record<string, any>>(e: Event, type: (new () => T)): ValidationResult<T> {
    console.log('submit');
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    if (!target) {
        console.log('no target');
        return new ValidationResult<T>(type);
    }
    const res: ValidationResult<T> = checkData<T>(target, type);
    return res;
}

export function validationSubmitHandler(e: Event) {
    const target = e.target as HTMLFormElement;
    if (!target) {
        return;
    }
    e.preventDefault();
    console.log('submit');
    processFormData(target);
    // checkData<LoginFormModel>(target, LoginFormModel);
}

export const validationInputHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target) {
        return;
    }
    e.preventDefault();

    if (!target.readOnly) {     //if (!attr["readonly"])
        checkInputElement(target);
    }

    // processFormData();
}
