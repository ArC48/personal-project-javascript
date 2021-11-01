import { metaType } from "../types/types";

export interface Scenario{
    readonly index: number;
    readonly meta: metaType<string>;
    call(store?: any): Promise<any>;
    restore?(store?: any): Promise<any>;
}
