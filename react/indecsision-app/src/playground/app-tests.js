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

const user = {
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

const template1 = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
);

const appTemplate = (
    <div>
        <h1>{app.title}</h1>
        <h4>{app.subtitle}</h4>
    </div>
);

const appRoute = document.getElementById('app');

ReactDOM.render(template, appRoute);