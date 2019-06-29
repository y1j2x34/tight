import DataParser, {
    DataParserStatic,
    DataParserConstructor
} from './DataParser';

export default class ParserRegistry {
    public static register() {
        return (constructor: DataParserConstructor) => {
            ParserRegistry.getInstance().register(constructor);
        };
    }
    public static getInstance(): ParserRegistry {
        return ParserRegistry.INSTANCE;
    }
    private static readonly INSTANCE = new ParserRegistry();
    private readonly parsers: {
        [name: string]: DataParser;
    } = {};
    private readonly parserNames: string[] = [];
    constructor() {
        //
    }
    public getParser(name: string): DataParser | undefined {
        return this.parsers[name];
    }
    public findParser(value: any): DataParser | undefined {
        const names = this.parserNames;
        const parsers = this.parsers;
        for (let i = 0, len = names.length; i < len; i++) {
            const name = names[i];
            if (parsers[name].accept(value)) {
                return parsers[name];
            }
        }
    }
    private register(ParserClass: DataParserConstructor) {
        const parser = new ParserClass();
        const name = ((ParserClass as any) as DataParserStatic).getName();
        this.parsers[name] = parser;
        this.parserNames.push(name);
    }
}
