import HTTP from "../services/http";
export const host = 'https://ya-praktikum.tech/api/v2';
export class BaseApi {
    protected http: HTTP;

    constructor(suffix?: string) {
        this.http = new HTTP(suffix, host);
    }

}
