export type storeType = object | null;

//type with generic

export type metaType<T> = {
    title: T;
    description: T;
};