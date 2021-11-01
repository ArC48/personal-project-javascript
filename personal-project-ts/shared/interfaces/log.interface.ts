export interface ErrorMessage{
    index: number;
    meta: {
        title: string;
        description: string;
    };
    storeBefore: object;
    storeAfter?: any;
    error: {
        name: string;
        message: string;
        stack: string | undefined;
    };
}

export interface SuccessMessage{
    index: number;
    meta: {
        title: string;
        description: string;
    };
    storeBefore: any;
    storeAfter: any;
    error: null;
}