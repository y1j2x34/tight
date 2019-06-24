import DataParser, {
    AbstractDataParser,
    DataParserStatic
} from '../core/DataParser';
import DecodeContext from '../core/DecodeContext';
import EncodeContext from '../core/EncodingContext';
import ObjectPath from '../core/ObjectPath';
import ParserRegistry from '../core/ParserRegistry';
import istatic from '../helper';
import Json from '../Json';
import { ARRAY } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class ArrayParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return ARRAY;
    }
    public preEncode(data: any[], path: ObjectPath, ec: EncodeContext): void {
        const isHandled = ec.recordDataInfo(data, path, this.getName());
        if (isHandled) {
            return;
        }
        const registry = ParserRegistry.getInstance();
        for (let i = 0, len = data.length; i < len; i++) {
            const item = data[i];
            const cpath = path.child(i + '');
            const parser = registry.findParser(item);
            if (!parser) {
                ec.recordDataInfo(item, cpath);
            } else {
                parser.preEncode(item, cpath, ec);
            }
        }
    }
    public encode(data: any[], path: ObjectPath, ec: EncodeContext): Json {
        const registry = ParserRegistry.getInstance();
        return data.map((item, i) => {
            const cpath = path.child(i + '');
            const parserName = ec.getParserName(cpath);
            const parser = registry.getParser(parserName);
            if (!parser) {
                return item;
            } else {
                return parser.encode(item, cpath, ec);
            }
        });
    }
    public decode(value: Json, path: ObjectPath, dc: DecodeContext): any {
        const array = value as any[];
        const registry = ParserRegistry.getInstance();
        const result: any[] = [];
        dc.recordValueRef(result, path);
        return array.reduce((all, item, i) => {
            const cpath = path.child(i + '');
            const parserName = dc.getParserName(cpath, item);
            const parser = registry.getParser(parserName) as DataParser;
            if (parser) {
                all.push(parser.decode(item, cpath, dc));
            } else {
                all.push(item);
            }
            return all;
        }, result);
    }
    public accept(value: any): boolean {
        return Array.isArray(value);
    }
}
