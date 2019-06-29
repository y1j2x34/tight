import DataParser, {
    AbstractDataParser,
    DataParserStatic
} from '../core/DataParser';
import ObjectPath from '../core/ObjectPath';
import EncodeContext from '../core/EncodingContext';
import Json from '../Json';
import istatic from '../helper';
import ParserRegistry from '../core/ParserRegistry';
import { T_INFINITY } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class InfinityParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return T_INFINITY;
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        ec.recordDataInfo(Infinity, path, this.getName());
    }
    public encode(data: any): Json {
        return data + '';
    }
    public decode(value: Json): any {
        return value === '-Infinity' ? -Infinity : Infinity;
    }
    public accept(data: any): boolean {
        return typeof data === 'number' && Math.abs(data) === Infinity;
    }
}
