import DataParser, {
    AbstractDataParser,
    DataParserStatic
} from '../core/DataParser';
import ObjectPath from '../core/ObjectPath';
import EncodeContext from '../core/EncodingContext';
import Json from '../Json';
import ParserRegistry from '../core/ParserRegistry';
import istatic from '../helper';
import DecodeContext from '../core/DecodeContext';
import { BUFFER } from './consts';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class ArrayBufferParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return BUFFER;
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        ec.recordDataInfo(data, path, this.getName());
    }
    public encode(data: ArrayBuffer): Json {
        const array = new Uint8Array(data);
        return Array.prototype.slice.call(array);
    }
    public decode(value: Json, path: ObjectPath, dc: DecodeContext): any {
        const arr = value as number[];
        const view = new Uint8Array(new ArrayBuffer(arr.length));
        view.set(arr, 0);
        dc.recordValueRef(view.buffer, path);
        return view.buffer;
    }
    public accept(data: any): boolean {
        return data instanceof ArrayBuffer;
    }
}
