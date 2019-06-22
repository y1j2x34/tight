export type Type<T> = new (...args: any[]) => T;

export default function istatic<T>() {
    return (constructor: T) => {
        // EMPTY
    };
}
