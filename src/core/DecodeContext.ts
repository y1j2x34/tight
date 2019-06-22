import ObjectPath from './ObjectPath';
import ObjectSet from './ObjectSet';
import Json from '../Json';
import ParserRegistry from './ParserRegistry';
import { OBJECT, ARRAY } from '../parser/consts';
import DataParser from './DataParser';
import StringMap from '../types';

export default class DecodeContext {
    private readonly pool: ObjectSet = new ObjectSet();
    private readonly objectParser = ParserRegistry.getInstance().getParser(
        OBJECT
    ) as DataParser;
    private readonly arrayParser = ParserRegistry.getInstance().getParser(
        ARRAY
    ) as DataParser;
    constructor(private readonly refInfo: StringMap) {}
    public getParserName(path: ObjectPath, value: Json): string {
        const pathname = path.toString();
        let parserName = this.refInfo[pathname];
        if (!parserName) {
            if (this.arrayParser.accept(value)) {
                parserName = ARRAY;
            } else if (this.objectParser.accept(value)) {
                parserName = OBJECT;
            }
            if (parserName) {
                this.refInfo[pathname] = parserName;
            }
        }
        return parserName;
    }
    public recordValueRef(data: any, path: ObjectPath) {
        this.pool.add(data, path);
    }
    public recordPathParserName(path: ObjectPath, name: string) {
        this.refInfo[path.toString()] = name;
    }
    public getValue(path: ObjectPath): any {
        return this.pool.getValue(path);
    }
}
