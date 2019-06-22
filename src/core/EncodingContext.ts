import ObjectPath from './ObjectPath';
import ObjectSet from './ObjectSet';
import StringMap from '../types';

export default class EncodeContext {
    private pool: ObjectSet = new ObjectSet();
    private parserNames: StringMap = {};
    private refInfo: StringMap = {};
    public isHandled(data: any): boolean {
        return this.pool.contains(data);
    }
    public recordDataInfo(
        data: any,
        path: ObjectPath,
        parserName?: string
    ): boolean {
        if (this.isHandled(data)) {
            this._recordDataInfo(data, path, 'ref');
            return true;
        } else {
            this._recordDataInfo(data, path, parserName);
            return false;
        }
    }
    public getPath(data: any): ObjectPath | undefined {
        return this.pool.getPath(data);
    }
    public getParserName(path: ObjectPath): string {
        return this.parserNames[path.toString()];
    }
    public getReferenceInfo() {
        return this.refInfo;
    }
    private _recordDataInfo(data: any, path: ObjectPath, parserName?: string) {
        this.pool.add(data, path);
        const pathName = path.toString();
        if (parserName) {
            this.parserNames[pathName] = parserName;
            switch (parserName) {
                case 'obj':
                case 'array':
                    break;
                default:
                    this.refInfo[pathName] = parserName;
                    break;
            }
        }
    }
}
