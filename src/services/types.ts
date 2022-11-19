export type TypeDict<T = unknown> = {
    [key: string | number]: T
}

export type TypeDictUnknown = TypeDict<unknown>;

export type TypeDictRootQuery<T = unknown> = TypeDict<T> & {
    rootQuery: string;
}

export type TypeDefinedProps = {
    "setting"?: TypeDict<boolean | string>;
    "attr"?: TypeDict<string>;
    "events"?: TypeDict<EventListenerOrEventListenerObject>;

};

export type TypeMixedUnknownProps = TypeDefinedProps & TypeDictUnknown;
