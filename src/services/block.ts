import {v4 as makeUUID} from 'uuid';
import Handlebars from "handlebars";
import EventBus from './eventBus';
import {TypeDict, TypeMixedUnknownProps} from './types'
import isBlock from '../utils/isBlock';
import isBlockArray from "../utils/isBlockArray";
import isEqual from "../utils/isEqual";

export default class Block {

    static EVENTS: TypeDict<string> = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    }

    _props: TypeMixedUnknownProps;
    _children: TypeDict<Block>;
    _childrenArray: TypeDict<Block[]>;
    _id: string;
    _element: HTMLElement;
    _meta: { tag: string; props?: TypeMixedUnknownProps; };
    _eventBus: EventBus;

    constructor(tag = "div", propsAndChildren: TypeMixedUnknownProps = {}) {
        const {children, childrenArray, props} = this.getChildren(propsAndChildren);

        this._eventBus = new EventBus();
        this._id = makeUUID();
        this._children = this.makePropsProxy(children) as (TypeDict<Block>);
        this._childrenArray = this.makePropsProxy(childrenArray) as (TypeDict<Block[]>);
        this._props = this.makePropsProxy({...props, _id: this._id});
        this._meta = {tag, props};

        this.registerEvents();
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    getChildren(propsAndChildren: TypeMixedUnknownProps): { children: TypeDict<Block>; childrenArray: TypeDict<Block[]>; props: TypeMixedUnknownProps; } {
        const children: TypeDict<Block> = {};
        const childrenArray: TypeDict<Block[]> = {};
        const props: TypeMixedUnknownProps = {};

        Object.keys(propsAndChildren).forEach(key => {
            const value = propsAndChildren[key];
            if (isBlock(value)) {
                children[key] = value;
            } else if (isBlockArray(value)) {
                childrenArray[key] = value;
            } else {
                props[key] = value;
            }

        });

        return {children, childrenArray, props};
    }

    addAttribute(): void {
        const {attr = {}} = this._props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        });
    }

    addEvents(): void {
        const {events = {}} = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        })
    }

    removeEvents(): void {
        const {events = {}} = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    registerEvents(): void {
        this._eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this));
        this._eventBus.subscribe(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.subscribe(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init(): void {
        this._element = this.createDocumentElement(this._meta.tag);
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this._children).forEach(child => {
            child.dispatchComponentDidMount();
        });
        Object.values(this._childrenArray).forEach(childrenArrayRecord =>
            childrenArrayRecord.forEach(child => {
                child.dispatchComponentDidMount();
            })
        );
    }

    componentDidMount(): void {
    }

    dispatchComponentDidMount(): void {
        this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        if (Object.keys(this._children).length || Object.keys(this._childrenArray).length) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    _componentDidUpdate(oldProps: TypeMixedUnknownProps & TypeDict<Block>, newProps: TypeMixedUnknownProps & TypeDict<Block>): void {
        const isReRender: boolean = this.componentDidUpdate(oldProps, newProps);
        if (isReRender) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: TypeMixedUnknownProps & TypeDict<Block>, newProps: TypeMixedUnknownProps & TypeDict<Block>): boolean {

        return isEqual(newProps, oldProps);
    }

    leave() {
        this.removeEvents();
    }

    setProps(newProps: TypeMixedUnknownProps): void {
        if (!newProps) {
            return;
        }

        const {children, childrenArray, props} = this.getChildren(newProps);

        if (Object.values(children).length) {
            Object.assign(this._children, children);
        }

        if (Object.values(childrenArray).length) {
            Object.assign(this._childrenArray, children);
        }

        if (Object.values(props).length) {
            Object.assign(this._props, props);
        }

    }

    _clearElement() {
        this.removeEvents();
        this._element.innerHTML = '';
    }

    _render(): void {
        const block: Node | void = this.render();
        this._clearElement();
        if (block) {
            this._element.appendChild(block);
            this.addEvents();
            this.addAttribute();
        }
    }

    render(): DocumentFragment | void {
    }

    getContent(): HTMLElement {        //Node = base
        return this._element;
    }

    makePropsProxy(props: TypeMixedUnknownProps) {
        return new Proxy(props, {
            get: (target: TypeMixedUnknownProps, prop: string) => {
                const value = target[prop];
                return typeof (value) === 'function' ? value.bind(target) : value;
            },
            set: (target: TypeMixedUnknownProps, prop: string, value) => {
                const oldProp = {...target};
                target[prop] = value;
                this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProp, target);
                return true;
            }
        });
    }

    createDocumentElement(tag: string): HTMLElement {
        const element: HTMLElement = document.createElement(tag);

        if (this._props.setting?.withInternalID)
            element.setAttribute('data-id', this._id);

        return element;
    }

    show(): void {
        this.getContent().style.display = 'block';
    }

    hide(): void {
        this.getContent().style.display = 'none';
    }

    compile(template: string, props?: TypeMixedUnknownProps): DocumentFragment {
        if (typeof (props) == 'undefined') {
            props = this._props;
        }

        const propsAndStubs = {...props};

        Object.entries(this._children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        Object.entries(this._childrenArray).forEach(([key, childArray]) => {
            propsAndStubs[key] = childArray.reduce((previousValue, child) => previousValue += `<div data-id="${child._id}"></div>`, "");
        });

        const fragment: HTMLTemplateElement = this.createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this._children).forEach(child => {
            const stub: Element | null = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        Object.values(this._childrenArray).forEach(childArrays =>
            childArrays.forEach(child => {
                const stub: Element | null = fragment.content.querySelector(`[data-id="${child._id}"]`);
                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            })
        );

        return fragment.content;
    }

}
