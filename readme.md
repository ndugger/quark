# quark

[ Shadow DOM + Virtual DOM ] Web Component Framework For Web Applications

**Compatible with JSX**

```
npm install git+https://github.com/ndugger/quark.git
```

This project is open source; although I will be using it in production (in personal projects),
I will not offer any promise of support, nor will I quickly address issues unless it suits my projects.

The purpose of this project is to explore how to create a react-like component
infrastructure and lifecycle using native Web Components (custom elements & shadow DOM).


## Performance

Performance will mostly be beholden to the efficiency of shadow DOM, but the virtual DOM diffing
will have a significant impact as well.

TODO


## State & Updating

Component state is managed by an object that implements `Map` (due to issues surrounding extending `Map`);
every change to the state's entries triggers the component to **update**, and then **render**.

```javascript
static initialState = {
    foo: false,
    bar: true
};

handleSomeAction () {
    this.state.set('foo', true);
    this.state.delete('bar');
}
```

you may also force a component to update without using the built-in state, by calling the `update` method.


## Lifecycle Methods

#### create - `handleComponentCreate (event) { }`
Dispatched when the component's constructor is called.

#### connect - `handleComponentConnect (event) { }`
Dispatched when the component has been attached to the DOM.

#### disconnect - `handleComponentDisconnect (event) { }`
Dispatched when the component has been disconnected from the DOM.

#### render - `handleComponentRender (event) { }`
Dispatched when the component has been rendered.

#### ready - `handleComponentReady (event) { }`
Dispatched after the component has been rendered and is ready to be used.

#### update - `handleComponentUpdate (event) { }`
Dispatched every time the component's state changes.


## Example

```javascript
import { Component, element } from 'quark';

class ExampleApp extends Component {

    static elementName = 'example-app';

    static initialState = {
        color: 'red'
    };

    static defaultProperties = {
        message: 'This text changes color!'
    };

    handleInput (event) {
        this.state.set('color', event.target.value);
    }

    render () {
        const color = this.state.get('color');

        return (
            element('article', null, [
                element('p', { style: { color } }, this.message),
                element('input', { oninput: e => this.handleInput(e) })
            ])
        )
    }
}

document.body.appendChild(new ExampleApp());
```


## JSX Compatible

```javascript
element(MyComponent, null, [
    element('div', null, 'Without JSX')
])
```

```javascript
<MyComponent>
    <div>With JSX</div>
</MyComponent>
```
