export type TypeDict<T> = {
    [key: string | number]: T
}

export type TypeDictUnknown = TypeDict<unknown>;

export type TypeDefinedProps = {
    "setting"?: TypeDict<boolean | string>;
    "attr"?: TypeDict<string>;
    "events"?: TypeDict<EventListenerOrEventListenerObject>;
};

export type TypeMixedUnknownProps = TypeDefinedProps & TypeDictUnknown;
