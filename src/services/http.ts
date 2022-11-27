import queryStringify from "../utils/queryStringify";

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export default class HTTP {
    _baseUri: string;

    constructor(baseUri: string) {
        this._baseUri = baseUri;
    }

    // get defaultTimeoutMs() {
    //     return 5000;
    // }

    // get allowedOptionNames() {
    //     return ['timeout', 'headers', 'data'];
    // }

    // checkWrongOptions(options) {
    //     const keys = Object.keys(options);
    //     const wrongOptions = keys.filter(x => (x in this.allowedOptionNames === false) && options.hasOwnProperty(x));
    //     if (wrongOptions.length > 0) {
    //         const errProps = wrongOptions.join(", ");
    //         throw new Error(`Запрещенные свойства объекта options: ${errProps}`);
    //     }
    // }

    get = (url: string, options: Record<string, any> = {}) => {
        // this.checkWrongOptions(options);
        //
        // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put = (url: string, options: Record<string, any> = {}) => {
        // this.checkWrongOptions(options);
        //
        // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post = (url: string, options: Record<string, any> = {}) => {
        // this.checkWrongOptions(options);
        //
        // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete = (url: string, options: Record<string, any> = {}) => {
        // this.checkWrongOptions(options);
        //
        // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };


// PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj


    // request = (url, options, timeout = this.defaultTimeoutMs) => {
    request = (url: string, options: Record<string, any> = {}, timeout = 5000) => {
        // const handleError = err => {
        //     console.error(err);
        // };
        //
        // const handleErrorWithThrow = err => {
        //     console.error(err);
        //     throw new Error('Таймаут');
        // };

        url += this._baseUri;

        const {method, headers = {}} = options;
        let {data} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject("Ошибка. Не определен для вызова переданный метод ");
                return;
            }

            const req = new XMLHttpRequest();
            // req.open(method, url);
            //
            // Object.entries(headers).forEach(([k, v]) => {
            //     req.setRequestHeader(k, v);
            // })
            //
            // req.onload = function () {
            //     resolve(req);
            // };

            req.onabort = reject;
            req.onerror = reject;
            req.timeout = timeout;
            req.ontimeout = reject;
            req.onload = function () {
                resolve(req);
            };

            switch (method) {
                case METHODS.GET:
                    if (data) url += queryStringify(data);
                    req.onload = function () {
                        resolve(req);
                    };
                    req.open(method, url);
                    req.setRequestHeader('Content-Type', 'text/plain');
                    this.setHeaders(headers, req);
                    req.send(null);
                    break;
                case METHODS.POST:
                case METHODS.PUT:
                    req.open(method, url);
                    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    this.setHeaders(headers, req);
                    req.send(JSON.stringify(data));
                    break;
                case METHODS.DELETE:
                    req.open(method, url);
                    req.setRequestHeader('Content-Type', 'text/plain');
                    this.setHeaders(headers, req);
                    req.send(null);
                    break;
                default:
                    throw new Error("HTTP метод не реализован");
                    // break;
            }

            // if (method === METHODS.GET || !data) {
            //     req.send();
            // } else {
            //     req.send(data);
            // }

        })

    };

    setHeaders(headers: Record<string, any>, req: XMLHttpRequest) {
        Object.entries(headers).forEach(([k, v]) => {
            req.setRequestHeader(k, v);
        });
    }
}
