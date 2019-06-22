import DataParser, {
    AbstractDataParser,
    DataParserStatic
} from '../core/DataParser';
import ParserRegistry from '../core/ParserRegistry';
import istatic from '../helper';
import Json from '../Json';

@ParserRegistry.register()
@istatic<DataParserStatic>()
export default class PrimaryParser extends AbstractDataParser
    implements DataParser {
    public static getName(): string {
        return 'primary';
    }
    public preEncode(): void {
        //
    }
    public encode(data: any): Json {
        return data;
    }
    public decode(value: Json): any {
        return value;
    }
    public accept(data: any): boolean {
        switch (typeof data) {
            case 'number':
                return !isNaN(data) && isFinite(data);
            case 'string':
            case 'boolean':
                return true;
        }
        return false;
    }
}
