import HTTP from "../services/http";

export class BaseApi {
    protected http: HTTP;

    constructor(suffix?: string) {
        this.http = new HTTP(suffix);
    }

    // // @ts-ignore
    // create(param?: any) {
    //     throw new Error('Not implemented');
    // }
    //
    // // @ts-ignore
    // request(param?: any): any {
    //     throw new Error('Not implemented');
    // }
    //
    // update() {
    //     throw new Error('Not implemented');
    // }
    //
    // delete() {
    //     throw new Error('Not implemented');
    // }
}
