import ObjectPath from './ObjectPath';

export default class ObjectSet {
    private pool: any[] = [];
    private paths: ObjectPath[] = [];
    public add(v: any, path: ObjectPath) {
        if (this.contains(v)) {
            return;
        }
        this.pool.push(v);
        this.paths.push(path);
    }
    public getPath(v: any): ObjectPath | undefined {
        const index = this.indexOf(v);
        return this.paths[index];
    }
    public getValue(path: ObjectPath): any {
        const paths = this.paths;
        const len = paths.length;
        for (let i = 0; i < len; i++) {
            const p = paths[i];
            if (p.equals(path)) {
                return this.pool[i];
            }
        }
    }
    public contains(v: any): boolean {
        return this.indexOf(v) > -1;
    }
    private indexOf(v: any): number {
        let k = 0;
        const pool = this.pool;
        const len = pool.length;
        while (k < len) {
            if (sameValueZero(v, pool[k])) {
                return k;
            }
            k++;
        }
        return -1;

        function sameValueZero(x: any, y: any) {
            return (
                x === y ||
                (typeof x === 'number' &&
                    typeof y === 'number' &&
                    isNaN(x) &&
                    isNaN(y))
            );
        }
    }
}
