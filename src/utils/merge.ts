import {Indexed} from "../services/types";

function isIndexedObject(item: unknown): item is Indexed {
    let res = false;
    if (isObject(item)) {
        let i = 0;
        // @ts-ignore
        for (const k in item) {
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
    for (const k of arr) {
        if (k === testKey) {
            return true;
        }
    }
    return false;
}

export default function merge(left: Indexed, right: Indexed): Indexed {
    const leftKeys = Object.keys(left);
    for (const rightKey in right) {
        const rightValue = right[rightKey];
        if (isObjContainsKey(leftKeys, rightKey)) {
            const leftValue = left[rightKey];
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
