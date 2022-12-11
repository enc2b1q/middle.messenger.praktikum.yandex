import HTTP from "../services/http";

export class BaseApi {
    protected http: HTTP;

    constructor(suffix?: string) {
        this.http = new HTTP(suffix);
    }

}
