if (!ArrayBuffer.isView) {
    ArrayBuffer.isView = (value: any): value is ArrayBufferView => {
        return (
            value instanceof Int8Array ||
            value instanceof Int16Array ||
            value instanceof Int32Array ||
            (typeof BigInt64Array !== 'undefined' &&
                value instanceof BigInt64Array) ||
            value instanceof Float32Array ||
            value instanceof Float64Array ||
            value instanceof Uint8Array ||
            value instanceof Uint16Array ||
            value instanceof Uint32Array ||
            (typeof Uint8ClampedArray !== 'undefined' &&
                value instanceof Uint8ClampedArray) ||
            (typeof BigUint64Array !== 'undefined' &&
                value instanceof BigUint64Array) ||
            value instanceof DataView
        );
    };
}
