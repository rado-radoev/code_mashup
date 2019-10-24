console.log("app.js is running");

const app = {
    title: 'Indecision App',
    subtitle: 'Catchy subtitle',
    options: []
}

const appRoute = document.getElementById('app');

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    
    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        renderApp();
    }
}

const reset = () => {
    app.options = []
    renderApp();
}

const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options': 'No options'}</p>
            <p>{app.options.length}</p>
            <button onClick={reset}>Remove All</button>
            <ol>
                <li>Item one</li>
                <li>Item two</li>
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    
    ReactDOM.render(template, appRoute);
}

renderApp();