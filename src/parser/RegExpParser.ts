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
import { T_REG_EXP } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class RegExpParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return T_REG_EXP;
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        ec.recordDataInfo(data, path, this.getName());
    }
    public encode(data: RegExp, path: ObjectPath, ec: EncodeContext): Json {
        return [data.source, (data as any).options /* IE10 */ || data.flags];
    }
    public decode(value: string[], path: ObjectPath, dc: DecodeContext): any {
        return new RegExp(value[0], value[1]);
    }
    public accept(data: any): boolean {
        return data instanceof RegExp;
    }
}
