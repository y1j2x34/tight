export function encode(text: string): string {
    if (typeof btoa === 'function') {
        return btoa(text);
    } else if (typeof Buffer !== 'undefined') {
        return Buffer.from(text, 'binary').toString('base64');
    }
    // istanbul ignore next
    const base64 = require('js-base64');
    return base64.encode(text);
}

export function decode(encodedString: string): string {
    if (typeof atob === 'function') {
        return atob(encodedString);
    } else if (typeof Buffer !== 'undefined') {
        return Buffer.from(encodedString, 'base64').toString('binary');
    }
    // istanbul ignore next
    const base64 = require('js-base64');
    return base64.decode(encodedString);
}
