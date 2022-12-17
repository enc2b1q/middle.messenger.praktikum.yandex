import queryStringify from "../utils/queryStringify";
import {Indexed, RejectModel} from "./types";

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export type RequestOptionsType = {
    headers?: Record<string, string>;
    method: string;
    timeout?: number;
    data?: any;
    retries?: number;
}

export default class HTTP {
    private readonly _baseUri: string;

    constructor(suffix?: string, host?: string) {
        this._baseUri = `${host ?? ""}${suffix ?? ""}`;
    }

    get defaultTimeoutMs() {
        return 50000;
    }

    async get<TResp>(url: string, data?: {}): Promise<TResp> {
        return this.request(url, {method: HTTP_METHODS.GET, data});
    }

    async put<TResp>(url: string, data?: {}): Promise<TResp> {
        return this.request(url, {method: HTTP_METHODS.PUT, data});
    }

    async post<TResp>(url: string, data?: {}): Promise<TResp> {
        return this.request(url, {method: HTTP_METHODS.POST, data});
    }

    async delete<TResp>(url: string, data?: {}): Promise<TResp> {
        return this.request(url, {method: HTTP_METHODS.DELETE, data});
    }

    async request<TResp>(url: string,
                         options: RequestOptionsType = {method: HTTP_METHODS.GET}
    ): Promise<TResp> {
        return new Promise((resolve, reject) => {
            const {method, data, headers = {}} = options;

            url = this._baseUri + url;

            if (!method) {
                reject("Ошибка. Не определен для вызова переданный метод ");
                return;
            }

            const req = new XMLHttpRequest();
            req.withCredentials = true;

            req.onabort = reject;
            req.onerror = reject;
            req.timeout = options.timeout ?? this.defaultTimeoutMs;
            req.ontimeout = reject;
            req.onload = function () {
                let respAnswer;
                const respType = req.getResponseHeader('Content-Type');
                if (!!respType && respType.includes('application/json')) {
                    respAnswer = JSON.parse(req.response);
                } else {
                    respAnswer = req.response;
                }
                if (req.status === 200) {
                    resolve(respAnswer);
                } else if (req.status > 200 && req.status < 300) {
                    resolve(respAnswer);
                }
                else {
                    const model = new RejectModel();
                    model.status = req.status;
                    model.reason = respAnswer.reason;
                    model.sourceBody = respAnswer;
                    reject(model);
                }
            };

            const isGet: boolean = method === HTTP_METHODS.GET;
            if (isGet && !!data) {
                url += `?${queryStringify(data)}`;
            }
            req.open(method, url);

            this.setHeaders(headers, req);

            if (isGet || !data) {
                req.send();
            } else if (data instanceof FormData) {
                req.send(data);
            } else {
                req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                req.send(JSON.stringify(data));
            }

        })

    }

    setHeaders(headers: Indexed<string>, req: XMLHttpRequest) {
        Object.entries(headers).forEach(([k, v]) => {
            req.setRequestHeader(k, v);
        });
    }
}
