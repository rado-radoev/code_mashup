console.log("app.js is running");

var template = (
    <div>
    <h1>Indecsision App</h1>
    <p>This is some paragrapsh</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
    </div>
);

var template1 = (
    <div>
        <h1>Radoslav Radoev</h1>
        <p>Age: 33</p>
        <p>Location: San Diego</p>

    </div>
);

var appRoute = document.getElementById('app');

ReactDOM.render(template1, appRoute);