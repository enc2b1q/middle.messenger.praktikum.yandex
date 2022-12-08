// const METHODS = {
//     GET: 'GET',
//     POST: 'POST',
//     PUT: 'PUT',
//     DELETE: 'DELETE'
// };
//
// function fetchWithRetry(url, options) {
//     const retriesField = 'retries';
//
//     if (typeof options !== 'object') {
//         throw new Error('Должен быть object');
//     }
//     if (!options.hasOwnProperty(retriesField)) {
//         throw new Error(`Нет свойства ${retriesField}`);
//     }
//
//     const {method} = options;
//     if (!method) {
//         options['method'] = METHODS.GET
//     }
//
//     let retCnt = options[retriesField];
//     if (!Number.isInteger(retCnt)) {
//         throw new Error(`${retriesField} д.б. числом`);
//     }
//     retCnt = Number(retCnt);
//     if (retCnt <= 1) {
//         throw new Error(`${retriesField} д.б. больше 1`);
//     }
//
//     for (let i = 0; i < retCnt; i++) {
//         try {
//             const res = new HTTPTransport().request(url, options);
//             return res;
//         } catch (e) {
//             console.log(e);
//         }
//     }
//
// }
//
//
//
// /**
//  * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
//  * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
//  * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
//  */
// function queryStringify(data) {
//     if (typeof data !== 'object') {
//         throw new Error('Должен быть object');
//     }
//     // Можно делать трансформацию GET-параметров в отдельной функции
//
//     let str = Object.entries(data)
//         .map(([key, value], index, array) => `${key}=${value.toString()}${(index === array.length - 1) ? "" : "&"}`)
//         .reduce(
//             (previousValue, currentValue) => previousValue + currentValue, "");
//     if (str.length > 0) str = "?" + str;
//     return str;
// }
//
// class HTTPTransport {
//     _baseUri;
//     constructor(baseUri) {
//         this._baseUri = baseUri;
//     }
//
//     // get defaultTimeoutMs() {
//     //     return 5000;
//     // }
//
//     // get allowedOptionNames() {
//     //     return ['timeout', 'headers', 'data'];
//     // }
//
//     // checkWrongOptions(options) {
//     //     const keys = Object.keys(options);
//     //     const wrongOptions = keys.filter(x => (x in this.allowedOptionNames === false) && options.hasOwnProperty(x));
//     //     if (wrongOptions.length > 0) {
//     //         const errProps = wrongOptions.join(", ");
//     //         throw new Error(`Запрещенные свойства объекта options: ${errProps}`);
//     //     }
//     // }
//
//     get = (url, options = {}) => {
//         // this.checkWrongOptions(options);
//         //
//         // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
//         return this.request(url, {...options, method: METHODS.GET}, options.timeout);
//     };
//
//     put = (url, options = {}) => {
//         // this.checkWrongOptions(options);
//         //
//         // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
//         return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
//     };
//
//     post = (url, options = {}) => {
//         // this.checkWrongOptions(options);
//         //
//         // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
//         return this.request(url, {...options, method: METHODS.POST}, options.timeout);
//     };
//
//     delete = (url, options = {}) => {
//         // this.checkWrongOptions(options);
//         //
//         // if (!options.timeout) options.timeout = this.defaultTimeoutMs;
//         return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
//     };
//
//
// // PUT, POST, DELETE
//
//     // options:
//     // headers — obj
//     // data — obj
//
//
//     // request = (url, options, timeout = this.defaultTimeoutMs) => {
//     request = (url, options = {}, timeout = 5000) => {
//         // const handleError = err => {
//         //     console.error(err);
//         // };
//         //
//         // const handleErrorWithThrow = err => {
//         //     console.error(err);
//         //     throw new Error('Таймаут');
//         // };
//
//         url += this._baseUri;
//
//         const {method, headers = {}} = options;
//         let {data} = options;
//
//         return new Promise((resolve, reject) => {
//             if (!method) {
//                 reject("Ошибка. Не определен для вызова переданный метод ");
//                 return;
//             }
//
//             const req = new XMLHttpRequest();
//             // req.open(method, url);
//             //
//             // Object.entries(headers).forEach(([k, v]) => {
//             //     req.setRequestHeader(k, v);
//             // })
//             //
//             // req.onload = function () {
//             //     resolve(req);
//             // };
//
//             req.onabort = reject;
//             req.onerror = reject;
//             req.timeout = timeout;
//             req.ontimeout = reject;
//             req.onload = function () {
//                 resolve(req);
//             };
//
//             switch (method) {
//                 case METHODS.GET:
//                     if (data) url += queryStringify(data);
//                     req.onload = function () {
//                         resolve(req);
//                     };
//                     req.open(method, url);
//                     req.setRequestHeader('Content-Type', 'text/plain');
//                     this.setHeaders(headers, req);
//                     req.send(null);
//                     break;
//                 case METHODS.POST:
//                 case METHODS.PUT:
//                     req.open(method, url);
//                     req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
//                     this.setHeaders(headers, req);
//                     req.send(JSON.stringify(data));
//                     break;
//                 case METHODS.DELETE:
//                     req.open(method, url);
//                     req.setRequestHeader('Content-Type', 'text/plain');
//                     this.setHeaders(headers, req);
//                     req.send(null);
//                     break;
//                 default:
//                     throw new Error("HTTP метод не реализован")
//                     break;
//             }
//
//             // if (method === METHODS.GET || !data) {
//             //     req.send();
//             // } else {
//             //     req.send(data);
//             // }
//
//         })
//
//     };
//
//     setHeaders(headers, req) {
//         Object.entries(headers).forEach(([k, v]) => {
//             req.setRequestHeader(k, v);
//         });
//     }
// }
//
