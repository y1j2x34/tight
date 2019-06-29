import ObjectPath from './ObjectPath';
import ObjectSet from './ObjectSet';
import Json from '../Json';
import ParserRegistry from './ParserRegistry';
import { T_OBJECT, T_ARRAY } from '../parser/consts';
import DataParser from './DataParser';
import StringMap from '../types';

export default class DecodeContext {
    private readonly pool: ObjectSet = new ObjectSet();
    private readonly objectParser = ParserRegistry.getInstance().getParser(
        T_OBJECT
    ) as DataParser;
    private readonly arrayParser = ParserRegistry.getInstance().getParser(
        T_ARRAY
    ) as DataParser;
    constructor(private readonly refInfo: StringMap) {}
    public getParserName(path: ObjectPath, value: Json): string {
        const pathname = path.toString();
        let parserName = this.refInfo[pathname];
        if (!parserName) {
            if (this.arrayParser.accept(value)) {
                parserName = T_ARRAY;
            } else if (this.objectParser.accept(value)) {
                parserName = T_OBJECT;
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
