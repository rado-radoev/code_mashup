console.log('app.js is running')

var template = (
 <div>
    <h1>Indecision App</h1>
    <p>Some info to not make decision on</p>
    <ol>
        <li>Item one</li>
        <li>Item two</li>
    </ol>
 </div>
);






const appRoot = document.getElementById('app')

ReactDOM.render(template, appRoot);