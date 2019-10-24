console.log("app.js is running");

const app = {
    title: 'Indecision App',
    subtitle: 'Catchy subtitle',
    options: ['One', 'Two']
}

function getOptions(options) {
    if (options.length > 0) {
        return options;
    }
}

const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? 'Here are your options': 'No options'}</p>
        <ol>
            <li>Item one</li>
            <li>Item two</li>
        </ol>
    </div>
);

let count = 0;

const addOne = () => {
    console.log('addOne');
}

const minusOne = () => {
    console.log('minusOne');
}

const reset = () => {
    console.log('reset');
}

const templateTwo = (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={addOne}>+1</button>
        <button onClick={minusOne}>-1</button>
        <button onClick={reset}>reset</button>
    </div>
);

console.log(templateTwo);
const appRoute = document.getElementById('app');

ReactDOM.render(templateTwo, appRoute);