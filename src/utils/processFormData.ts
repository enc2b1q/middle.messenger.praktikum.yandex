// enum propName {
//  first_name= 'first_name',
//  second_name = 'second_name',
//  login = 'login',
//  email = 'email',
//  password = 'password',
//  phone = 'phone',
//  message = 'message'
// }


const first_name: string = 'first_name';
const second_name: string = 'second_name';
const login: string = 'login';
const email: string = 'email';
const password: string = 'password';
const phone: string = 'phone';
const message: string = 'message';

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


function validateItem(key: string, value: string) : boolean {
    if (key === first_name || key === second_name) {
        const patternNames =  /^[A-ZА-ЯЁ][A-Za-zА-Яа-яёЁ-]*$/;
        return patternNames.test(value);
    }
    else if (key === login) {
        const patternLogin = /^(?!\d+$)[A-Za-z-_0-9]{3,20}$/;
        return patternLogin.test(value);
    }
    else if (key === email) {
        const patternEmail = /^[A-Za-z0-9-]+@[A-Za-z0-9]+\.[a-z]+$/;
        return patternEmail.test(value);
    }
    else if (key === password) {
        const patternPassword = /^(?=\D*\d)(?=.*[A-Z]).{8,40}$/;
        return patternPassword.test(value);
    }
    else if (key === phone) {
        const patternPhone = /^[+0-9]{10,15}$/;
        return patternPhone.test(value);
    }
    else if (key === message) {
        const patternMessage = /.+/;
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