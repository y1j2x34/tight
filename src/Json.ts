export type Primary = string | number | boolean | null;

export interface JsonMap {
    [member: string]: Primary | JsonArray | JsonMap;
}

export interface JsonArray extends Array<Primary | JsonMap | JsonArray> {
    //
}

type Json = JsonMap | JsonArray | Primary;

export default Json;
