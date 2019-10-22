console.log("app.js is running");

var app = {
    title: 'Indecision App',
    subtitle: 'Catchy subtitle',
    options: ['One', 'Two']
}

function getOptions(options) {
    if (options.length > 0) {
        return options;
    }
}

var template = (
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

var user = {
    name: 'Rado',
    age: 29,
    location: 'SD'
}

// var userName = 'Rado Radoev'
// var userAge = 34;
// var userLocation = 'San Diego';

function getLocation(location) {
    if (location) {
        return <p>Location: {location}</p>;
    }
}

var template1 = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
);

var appTemplate = (
    <div>
        <h1>{app.title}</h1>
        <h4>{app.subtitle}</h4>
    </div>
);

var appRoute = document.getElementById('app');

ReactDOM.render(template, appRoute);