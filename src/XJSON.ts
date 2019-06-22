import EncodeContext from './core/EncodingContext';
import ObjectPath from './core/ObjectPath';
import ParserRegistry from './core/ParserRegistry';
import DecodeContext from './core/DecodeContext';
import StringMap from './types';
import Json from './Json';

export function stringify(object: any, space: number = 0): string {
    const ec = new EncodeContext();
    const root = new ObjectPath([]);
    const parser = ParserRegistry.getInstance().findParser(object);
    if (!parser) {
        return JSON.stringify(
            {
                i: {},
                d: object
            },
            null,
            space
        );
    } else {
        parser.preEncode(object, root, ec);
        const encoded = parser.encode(object, root, ec);
        const info = ec.getReferenceInfo();
        return JSON.stringify(
            {
                i: info,
                d: encoded
            },
            null,
            space
        );
    }
}

export function parse(xjson: string) {
    const parsed = JSON.parse(xjson);
    const refInfo = parsed.i;
    if (!refInfo) {
        return parsed;
    } else {
        const dc = new DecodeContext(refInfo as StringMap);
        const root = new ObjectPath([]);
        const data = parsed.d as Json;
        const parserName = dc.getParserName(root, data);
        const parser = ParserRegistry.getInstance().getParser(parserName);
        if (!parser) {
            throw new Error(`not parser found: `);
        }
        return parser.decode(data, root, dc);
    }
}
