import {Indexed} from "../services/types";

function isIndexedObject(item: unknown): item is Indexed {
    let res: boolean = false;
    if (isObject(item)) {
        let i: number = 0;
        // @ts-ignore
        for (let k in item) {
            i++;
        }
        if (i > 0) {
            res = true;
        }
    }
    return res;
}

function isObject(item: unknown): item is Object {
    return (!!item && typeof item === 'object' && !Array.isArray(item));
}

function isObjContainsKey(arr: Array<string>, testKey: string) {
    for (let k of arr) {
        if (k === testKey) {
            return true;
        }
    }
    return false;
}

export default function merge(left: Indexed, right: Indexed): Indexed {
    let leftKeys = Object.keys(left);
    for (let rightKey in right) {
        let rightValue = right[rightKey];
        if (isObjContainsKey(leftKeys, rightKey)) {
            let leftValue = left[rightKey];
            if (!isObject(leftValue) && !isObject(rightValue)) {
                left[rightKey] = rightValue;
            } else if (!isObject(leftValue) && isObject(rightValue) || isObject(leftValue) && !isObject(rightValue)) {
                //throw new Error("All items are not objects");
                left[rightKey] = rightValue;
            } else if (isIndexedObject(leftValue) && isIndexedObject(rightValue)) {
                left[rightKey] = merge(leftValue, rightValue);
            }
        } else {
            left[rightKey] = rightValue;
        }
    }
    return left;
}
