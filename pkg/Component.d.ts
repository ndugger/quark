import { Element } from './Element';
import { Hook } from './Hook';
/**
 * Symbol which represents a flag to determine whether a component is connected
 */
declare const connected: unique symbol;
/**
 * Symbol which represents which hooks are attached to a component
 */
declare const hooks: unique symbol;
/**
 * Symbol which represents a component's rendered tree
 */
declare const layout: unique symbol;
/**
 * Symbol which represents whether or not there are changes during update
 */
declare const flagged: unique symbol;
/**
 * Symbol which represents which contexts a component is subscribed to
 */
declare const subscriptions: unique symbol;
/**
 * Proxy used in order to register a custom element before it is instantiated for the first time
 */
declare const CustomHTMLElement: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * Base component class from which all custom components must extend
 */
export declare class Component extends CustomHTMLElement {
    /**\
     * Field in which a component's connected status is stored
     */
    private [connected];
    /**
     * Field in which component's registered hooks are stored
     */
    private [hooks];
    /**
     * Field in which component's template is stored
     */
    private [layout];
    /**
     * Field in which component render status is stored
     */
    private [flagged];
    /**
     * Field in which component's subscribed contexts is stored
     */
    private [subscriptions];
    /**
     * Part of custom elements API: called when element mounts to a DOM
     */
    protected connectedCallback(): void;
    /**
     * Part of custom elements API: called when element is removed from its DOM
     */
    protected disconnectedCallback(): void;
    /**
     * Custom lifecycle hook: called when element is ready or updated
     */
    protected updatedCallback(): void;
    /**
     * Used to hook into the connection lifecycle
     * @param event Connect lifecycle event
     */
    protected handleComponentConnect(event: Component.LifecycleEvent): void;
    /**
     * Used to hook into the create lifecycle
     * @param event Create lifecycle event
     */
    protected handleComponentCreate(event: Component.LifecycleEvent): void;
    /**
     * Used to hook into the disconnect lifecycle
     * @param event Disconnect lifecycle event
     */
    protected handleComponentDisconnect(event: Component.LifecycleEvent): void;
    /**
     * Used to hook into the ready lifecycle
     * @param event Ready lifecycle event
     */
    protected handleComponentReady(event: Component.LifecycleEvent): void;
    /**
     * Used to hook into the render lifecycle
     * @param event Render lifecycle event
     */
    protected handleComponentRender(event: Component.LifecycleEvent): void;
    /**
     * Used to hook into the update lifecycle
     * @param event Update lifecycle event
     */
    protected handleComponentUpdate(event: Component.LifecycleEvent): void;
    /**
     * Constructs a component's template
     */
    protected render(): Element.Child[];
    /**
     * Constructs a component's stylesheet
     */
    protected theme(): Component.Style[];
    /**
     * Creates a component, attaches lifecycle listeners upon instantiation, and initializes shadow root
     */
    constructor();
    /**
     * Retrieves a dependency from context.
     * @param context Object which acts as the key of the stored value
     */
    getContext<Ctx extends Component.Context>(context: new () => Ctx): Ctx['value'] | undefined;
    attachHook<State>(hook: Hook<State>): State | undefined;
    /**
     * Triggers an update
     * @param props Optional properties to update with
     * @param immediate Whether or not to attempt an update this frame
     */
    update(props?: object, immediate?: boolean): Promise<void>;
}
export declare namespace Component {
    /**
     * Adds `children` to props, useful for function-based components
     */
    type PropsWithChildren<Props = unknown> = Props & {
        children?: Element.Child[];
    };
    /**
     * Defines any component
     */
    type Any<Props = unknown> = Constructor<Node & Props> | Fn<Props> | (new () => Node);
    /**
     * Defines returnable types for styling a component
     */
    type Style = CSSStyleSheet | string;
    /**
     * Defines a class-based component
     */
    interface Constructor<Type extends Node = Node> {
        new (): Type;
    }
    /**
     * Defines a function-based component
     */
    interface Fn<Props = unknown> {
        (props: PropsWithChildren<Props>): Element[];
    }
    /**
     * Decides if a node is a component
     * @param node
     */
    function isComponent(node: Node | undefined): node is Component;
    /**
     * Decides if a component is a node constructor
     * @param constructor
     */
    function isConstructor<Props>(constructor: Any<Props>): constructor is Constructor<Node & Props>;
    /**
     * Decides if a component is a functional component
     * @param constructor
     */
    function isFn<Props>(constructor: Any<Props>): constructor is Fn<Props>;
    function getCurrentBranch(): Component;
    /**
     * Used to provide contextual state within a given component tree
     */
    class Context<Data = null> extends Component {
        value?: Data extends null ? ThisType<Context> : Data;
        render(): Element[];
        theme(): Component.Style[];
    }
    /**
     * Event interface used for component lifecycle triggers
     */
    class LifecycleEvent extends Event {
    }
}
export {};
