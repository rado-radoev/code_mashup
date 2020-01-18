console.log('app.js is running')

const app = {
    title: 'Indecision app',
    subtitle: 'Let the computer decide for you',
    options: ['One', 'Two']
}

var template = (
 <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
    <ol>
        <li>Item one</li>
        <li>Item two</li>
    </ol>
 </div>
);

var user = {
    name: 'Rado',
    age: 36,
    location: 'Sacramento'
}

function getLocation(location) {
    if (location) {
        return <p>Location: {location}</p>
    } 
}

var templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
);


const appRoot = document.getElementById('app')

ReactDOM.render(template, appRoot);