import DataParser, {
    AbstractDataParser,
    DataParserStatic
} from '../core/DataParser';
import ObjectPath from '../core/ObjectPath';
import EncodeContext from '../core/EncodingContext';
import Json from '../Json';
import istatic from '../helper';
import ParserRegistry from '../core/ParserRegistry';
import { T_NAN } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class NaNParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return T_NAN;
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        ec.recordDataInfo(NaN, path, this.getName());
    }
    public encode(): Json {
        return 'NaN';
    }
    public decode(): any {
        return NaN;
    }
    public accept(data: any): boolean {
        return typeof data === 'number' && isNaN(data);
    }
}
