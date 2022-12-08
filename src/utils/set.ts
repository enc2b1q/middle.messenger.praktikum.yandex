import {Indexed} from "../services/types";
import merge from "./merge";

function isStr(input: string): boolean {
    return input.length > 0;
}

export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (!isStr(path)) {
        throw new Error('path must be string with length > 0');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}
