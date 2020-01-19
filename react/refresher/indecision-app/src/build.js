
const appRoot = document.getElementById('app');

const button = {
    clicked: false
}

const toggle = () => {
    button.clicked = !button.clicked
    render();
}

const render = () => {

    const template = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={toggle}>{button.clicked ? 'Hide details' : 'Show details'}</button>
            {button.clicked && <p>Hey.These are some details you can now see!</p>}
        </div>
    );

    ReactDOM.render(template, appRoot);
}

render();