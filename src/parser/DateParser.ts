import DataParser, {
    AbstractDataParser,
    DataParserStatic
} from '../core/DataParser';
import ObjectPath from '../core/ObjectPath';
import EncodeContext from '../core/EncodingContext';
import Json from '../Json';
import istatic from '../helper';
import ParserRegistry from '../core/ParserRegistry';
import DecodeContext from '../core/DecodeContext';
import { T_DATE } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class DateParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return T_DATE;
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        ec.recordDataInfo(data, path, this.getName());
    }
    public encode(data: any): Json {
        return data;
    }
    public decode(value: Json, path: ObjectPath, dc: DecodeContext): any {
        const result = new Date(value as string);
        dc.recordValueRef(result, path);
        return result;
    }
    public accept(data: any): boolean {
        return data instanceof Date;
    }
}
