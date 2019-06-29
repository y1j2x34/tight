import istatic from '../helper';
import DataParser, {
    DataParserStatic,
    AbstractDataParser
} from '../core/DataParser';
import ParserRegistry from '../core/ParserRegistry';
import Json from '../Json';
import EncodeContext from '../core/EncodingContext';
import ObjectPath from '../core/ObjectPath';
import DecodeContext from '../core/DecodeContext';
import { T_OBJECT } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export class ObjectParser extends AbstractDataParser implements DataParser {
    public static getName(): string {
        return T_OBJECT;
    }
    constructor() {
        super();
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        const isHandled = ec.recordDataInfo(data, path, this.getName());
        if (isHandled) {
            return;
        }
        const registry = ParserRegistry.getInstance();
        for (const key in data) {
            const value = data[key];
            const cpath = path.child(key);
            const parser = registry.findParser(value);
            if (!parser) {
                ec.recordDataInfo(value, cpath);
            } else {
                parser.preEncode(value, cpath, ec);
            }
        }
    }
    public encode(data: any, path: ObjectPath, ec: EncodeContext): Json {
        const registry = ParserRegistry.getInstance();
        const obj: {
            [key: string]: any;
        } = {};
        for (const key in data) {
            const cpath = path.child(key);
            const parserName = ec.getParserName(cpath);
            const parser = registry.getParser(parserName);
            if (parser) {
                obj[key] = parser.encode(data[key], cpath, ec);
            } else {
                obj[key] = data[key];
            }
        }
        return obj;
    }
    public decode(value: Json, path: ObjectPath, dc: DecodeContext): any {
        const object = value as any;
        const registry = ParserRegistry.getInstance();
        const result = {};
        dc.recordValueRef(result, path);
        return Object.keys(object).reduce((obj: any, key) => {
            const cpath = path.child(key);
            const subValue = object[key];
            const parserName = dc.getParserName(cpath, subValue);
            const parser = registry.getParser(parserName);
            if (parser) {
                obj[key] = parser.decode(subValue, cpath, dc);
            } else {
                obj[key] = subValue;
            }
            return obj;
        }, result);
    }
    public accept(data: any): boolean {
        return (
            !!data && typeof data === 'object' && data.constructor === Object
        );
    }
}
