import CortexHTMLElement from './CortexHTMLElement';
import CortexNode from './CortexNode';
import CortexTree from './CortexTree';

const treeSymbol = Symbol('tree');

export default class CortexComponent extends CortexHTMLElement {

    private [ treeSymbol ]: CortexTree;

    public oncomponentconnect: (event: Event) => void;
    public oncomponentcreate: (event: Event) => void;
    public oncomponentdisconnect: (event: Event) => void;
    public oncomponentready: (event: Event) => void;
    public oncomponentrender: (event: Event) => void;
    public oncomponentupdate: (event: Event) => void;

    private connectedCallback(): void {

        this.dispatchEvent(new CustomEvent('componentconnect'));

        window.requestAnimationFrame(() => {
            this.renderedCallback();

            if (!this.classList.contains(this.constructor.name)) {
                this.className = this.constructor.name + (this.className ? ' ' : '') + this.className;
            }

            window.requestAnimationFrame(() => {
                this.dispatchEvent(new CustomEvent('componentready'));
            });
        });
    }

    private disconnectedCallback(): void {
        this.dispatchEvent(new CustomEvent('componentdisconnect'));
    }

    private renderedCallback(): void {
        const style = CortexNode.create(HTMLStyleElement, { textContent: this.theme() });
        const tree = CortexTree.from(this.render().concat(style));

        if (!this[ treeSymbol ]) {
            this[ treeSymbol ] = tree;
        }
        else {
            this[ treeSymbol ] = this[ treeSymbol ].diff(tree);
        }

        for (const node of this[ treeSymbol ]) if (node) {

            if (!CortexNode.getNode(node)) {
                node.create();
            }

            node.connect(this.shadowRoot);
        }

        this.dispatchEvent(new CustomEvent('componentrender'));
    }

    protected handleComponentConnect(event: CustomEvent): void {}

    protected handleComponentCreate(event: CustomEvent): void {}

    protected handleComponentDisconnect(event: CustomEvent): void {}

    protected handleComponentReady(event: CustomEvent): void {}

    protected handleComponentRender(event: CustomEvent): void {}

    protected handleComponentUpdate(event: CustomEvent): void {}

    public constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.addEventListener('componentconnect', (event: CustomEvent) => this.handleComponentConnect(event));
        this.addEventListener('componentcreate', (event: CustomEvent) => this.handleComponentCreate(event));
        this.addEventListener('componentdisconnect', (event: CustomEvent) => this.handleComponentDisconnect(event));
        this.addEventListener('componentready', (event: CustomEvent) => this.handleComponentReady(event));
        this.addEventListener('componentrender', (event: CustomEvent) => this.handleComponentRender(event));
        this.addEventListener('componentupdate', (event: CustomEvent) => this.handleComponentUpdate(event));

        this.dispatchEvent(new CustomEvent('componentcreate'));
    }

    public render(): CortexNode[] {
        return [];
    }

    public theme(): string {
        return '';
    }

    public update(props: object = {}): void {

        for (const prop of Object.keys(props)) {

            if (this[ prop ] === props[ prop ]) {
                break;
            }

            if (this[ prop ] && typeof this[ prop ] === 'object') {
                Object.assign(this[ prop ], props[ prop ]);
            }
            else {
                this[ prop ] = props[ prop ];
            }
        }

        this.dispatchEvent(new CustomEvent('componentupdate'));

        window.requestAnimationFrame(() => {
            this.renderedCallback();
        });
    }
}