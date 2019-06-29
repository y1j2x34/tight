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
import { T_REFERENCE } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class ReferenceParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return T_REFERENCE;
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        //
    }
    public encode(data: any, path: ObjectPath, ec: EncodeContext): Json {
        const refPath = ec.getPath(data);
        if (!refPath) {
            throw new Error('reference not found：' + path.toString());
        }
        return refPath.toString();
    }
    public decode(value: Json, path: ObjectPath, dc: DecodeContext): any {
        const ref = value as string;
        const refPath = new ObjectPath(ref.split('.'));
        return dc.getValue(refPath);
    }
    public accept(data: any): boolean {
        return false;
    }
}
