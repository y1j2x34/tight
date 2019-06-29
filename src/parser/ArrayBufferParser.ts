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
import * as base64 from '../base64';

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
        return base64.encode(
            String.fromCharCode.apply(null, (array as any) as number[])
        );
    }
    public decode(value: string, path: ObjectPath, dc: DecodeContext): any {
        const b64Decoded = base64.decode(value);
        const view = new Uint8Array(new ArrayBuffer(b64Decoded.length));
        for (let i = 0, len = view.length; i < len; i++) {
            view[i] = b64Decoded.charCodeAt(i);
        }
        dc.recordValueRef(view.buffer, path);
        return view.buffer;
    }
    public accept(data: any): boolean {
        return data instanceof ArrayBuffer;
    }
}
