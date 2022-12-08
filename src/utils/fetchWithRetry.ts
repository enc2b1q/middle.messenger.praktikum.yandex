import HTTP, {HTTP_METHODS, RequestOptionsType} from "../services/http";
// import { Indexed } from "../services/types";

export default function fetchWithRetry(url: string, options: RequestOptionsType): Promise<any> {
    const retriesField = 'retries';

    if (typeof options !== 'object') {
        throw new Error('Должен быть object');
    }

    // if (!options.hasOwnProperty(retriesField)) {
    //     throw new Error(`Нет свойства ${retriesField}`);
    // }

    const {method} = options;
    if (!method) {
        options['method'] = HTTP_METHODS.GET
    }

    let retCnt = options[retriesField];
    if (!retCnt) {
        retCnt = 1;
    }

    if (!Number.isInteger(retCnt)) {
        throw new Error(`${retriesField} д.б. числом`);
    }
    retCnt = Number(retCnt);
    if (retCnt < 1) {   //Note: was <= 1
        throw new Error(`${retriesField} д.б. больше 0`);
    }

    for (let i = 0; i < retCnt; i++) {
        try {
            const res: Promise<unknown> = new HTTP().request(url, options);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    throw new Error(`Не удалось получить результат за количество попыток: ${retCnt}`);
}



