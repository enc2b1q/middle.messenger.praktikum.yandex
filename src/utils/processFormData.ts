// enum propName {
//  first_name= 'first_name',
//  second_name = 'second_name',
//  login = 'login',
//  email = 'email',
//  password = 'password',
//  phone = 'phone',
//  message = 'message'
// }

export const first_name: string = 'first_name';
export const second_name: string = 'second_name';
export const display_name: string = 'display_name';
export const login: string = 'login';
export const email: string = 'email';
export const password: string = 'password';
export const oldPassword: string = 'oldPassword';
export const newPassword: string = 'newPassword';
export const password_repeat: string = 'password_repeat';
export const phone: string = 'phone';
export const message: string = 'message';

const msgPatternNames = 'Допустимо: латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
const msgPatternLogin = 'Допустимо: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
const msgPatternEmail = 'Допустимо: латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы';
const msgPatternPassword = 'Допустимо: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
const msgPatternPhone = 'Допустимо: от 10 до 15 символов, состоит из цифр, может начинается с плюса';
const msgPatternMessage = 'Допустимо: не должно быть пустым';

const validationMsgs: Map<string, string> = new Map<string, string>();
validationMsgs.set(first_name, msgPatternNames);
validationMsgs.set(second_name, msgPatternNames);
validationMsgs.set(display_name, msgPatternNames);
validationMsgs.set(login, msgPatternLogin);
validationMsgs.set(email, msgPatternEmail);
validationMsgs.set(password, msgPatternPassword);
validationMsgs.set(oldPassword, msgPatternPassword);
validationMsgs.set(newPassword, msgPatternPassword);
validationMsgs.set(password_repeat, msgPatternPassword);
validationMsgs.set(phone, msgPatternPhone);
validationMsgs.set(message, msgPatternMessage);

export function getValidationMsg(name: string) : string {
    return validationMsgs.get(name) ?? "";
}

const patternNames =  /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/;
const patternLogin = /^(?!\d+$)[A-Za-z-_0-9]{3,20}$/;
const patternEmail = /^[A-Za-z0-9-]+@[A-Za-z0-9]+\.[a-z]+$/;
const patternPassword = /^(?=\D*\d)(?=.*[A-Z]).{8,40}$/;
const patternPhone = /^[+0-9]{10,15}$/;
const patternMessage = /.+/;

const validationPatternStrings: Map<string, string> = new Map<string, string>();
validationPatternStrings.set(first_name, patternNames.toString());
validationPatternStrings.set(second_name, patternNames.toString());
validationPatternStrings.set(display_name, patternNames.toString());
validationPatternStrings.set(login, patternLogin.toString());
validationPatternStrings.set(email, patternEmail.toString());
validationPatternStrings.set(password, patternPassword.toString());
validationPatternStrings.set(oldPassword, patternPassword.toString());
validationPatternStrings.set(newPassword, patternPassword.toString());
validationPatternStrings.set(password_repeat, patternPassword.toString());
validationPatternStrings.set(phone, patternPhone.toString());
validationPatternStrings.set(message, patternMessage.toString());

export function getValidationPatternString(name: string) : string {
    return validationPatternStrings.get(name) ?? "";
}

export function checkInputElement(target: HTMLInputElement): void {
    if(!target) {
        return;
    }
    if (validateItem(target.name, target.value)) {
        target.style.backgroundColor = 'white';
    }
    else {
        target.style.backgroundColor = 'pink';
    }
}

function validateProps(data: { [p: string]: File | string }) : boolean {
    const entries = Object.entries(data);
    let res = true;
    entries.forEach(([k,v]) => {
        if (!isString(v)) {
            return false;
        }
        const localRes = validateItem(k,v);
        console.log(`validation of ${k}: ${localRes}`);
        res &&= localRes;
    })
    return res;
}

//use mapping
function validateItem(key: string, value: string) : boolean {
    if (key === first_name || key === second_name || key === display_name) {

        return patternNames.test(value);
    }
    else if (key === login) {

        return patternLogin.test(value);
    }
    else if (key === email) {

        return patternEmail.test(value);
    }
    else if (key === password || key === password_repeat || key === oldPassword || key === newPassword) {

        return patternPassword.test(value);
    }
    else if (key === phone) {

        return patternPhone.test(value);
    }
    else if (key === message) {

        return patternMessage.test(value);
    }
    else {
        return true;
    }
}

function isString(value: unknown): value is string {
    return typeof value === 'string';
}


export default function processFormData(): boolean {
    const formEl: HTMLFormElement = document.querySelector('#form') as HTMLFormElement;
    if (formEl) {
        const inputElementsNL: NodeListOf<Element> = document.querySelectorAll('#form input');
        if (inputElementsNL) {
            const inputElements = Array.from(inputElementsNL) as HTMLInputElement[];
            if (inputElements){
                inputElements.forEach(el => checkInputElement(el));
            }
        }
        //write to console
        const data = Object.fromEntries(new FormData(formEl).entries());
        console.log(data);
        const isValidated = validateProps(data);
        if (!isValidated){
            return false;
        }
        //sendData() //fetchWithRetry
        return true;
    }
    return false;
}