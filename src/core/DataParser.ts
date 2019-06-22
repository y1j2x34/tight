import Json from '../Json';
import EncodeContext from './EncodingContext';
import ObjectPath from './ObjectPath';
import DecodeContext from './DecodeContext';

export interface DataParserStatic {
    getName(): string;
}
export type DataParserConstructor = new () => DataParser;

export default interface DataParser {
    getName(): string;
    preEncode(data: any, path: ObjectPath, ec: EncodeContext): void;
    encode(data: any, path: ObjectPath, ec: EncodeContext): Json;
    decode(value: Json, path: ObjectPath, dc: DecodeContext): any;
    accept(value: any): boolean;
}
export abstract class AbstractDataParser implements DataParser {
    public getName(): string {
        return ((this.constructor as any) as DataParserStatic).getName();
    }
    public abstract preEncode(
        data: any,
        path: ObjectPath,
        ec: EncodeContext
    ): void;
    public abstract encode(
        data: any,
        path: ObjectPath,
        ec: EncodeContext
    ): Json;
    public abstract decode(
        value: Json,
        path: ObjectPath,
        dc: DecodeContext
    ): any;
    public abstract accept(value: any): boolean;
}
