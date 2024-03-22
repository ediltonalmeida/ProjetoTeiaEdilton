export const isNil = (value: any): value is (null | undefined) => {
    return value === null || typeof (value) === 'undefined';
};

export const isObject = (value: any): boolean => {
    return value && value.constructor === Object;
};

export const isBlank = (value: any): boolean => {
    return isNil(value) ||
        (isObject(value) && Object.keys(value).length === 0) ||
        value.toString().trim() === '';
};

export const isPresent = (value: any): boolean => {
    return !isBlank(value);
};

// https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try#20392392
export const tryParseJSON = (jsonString: any): boolean => {
    try {
        var o = JSON.parse(jsonString);

        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};
