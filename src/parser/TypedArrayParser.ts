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
import { TypedArray } from '../types';

type TypedArrayConstructor = new (buffer: ArrayBuffer) => TypedArray | DataView;

const flagTypeMap: {
    [flag: string]: TypedArrayConstructor;
} = {
    i8: Int8Array,
    i16: Int16Array,
    i32: Int32Array,
    ui8: Uint8Array,
    ui16: Uint16Array,
    u132: Uint32Array,
    f32: Float32Array,
    f64: Float64Array,
    view: DataView
};

const flags = Object.keys(flagTypeMap);
const types = flags.map((flag: string) => flagTypeMap[flag]);

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class TypedArrayParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return 'typedarray';
    }
    public preEncode(data: any, path: ObjectPath, ec: EncodeContext): void {
        ec.recordDataInfo(data, path, this.getName());
    }
    public encode(data: TypedArray | DataView): Json {
        const array = new Uint8Array(data.buffer);
        const flag = this.getTypeFlag(data);
        const b64 = btoa(
            String.fromCharCode.apply(null, (array as any) as number[])
        );
        return `${flag}:${b64}`;
    }
    public decode(value: string, path: ObjectPath, dc: DecodeContext): any {
        const colonIndex = value.indexOf(':');
        const flag = value.substring(0, colonIndex);
        const b64 = value.substring(colonIndex + 1);
        const b64Decoded = atob(b64);
        const TypedConstructor = types[flags.indexOf(flag)];
        const view = new Uint8Array(b64Decoded.length);
        for (let i = 0, len = view.length; i < len; i++) {
            view[i] = b64Decoded.charCodeAt(i);
        }
        const result = new TypedConstructor(view.buffer);
        dc.recordValueRef(result, path);
        return result;
    }
    public accept(data: any): boolean {
        if (!!data) {
            return ArrayBuffer.isView(data);
        } else {
            return false;
        }
    }
    private getTypeFlag(data: TypedArray | DataView): string {
        const index = types.indexOf(data.constructor as TypedArrayConstructor);
        return flags[index];
    }
}
