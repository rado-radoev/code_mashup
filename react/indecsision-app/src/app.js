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

var user = {
    name: 'Rado',
    age: 33, 
    location: 'SD'
}

// var userName = 'Rado Radoev'
// var userAge = 34;
// var userLocation = 'San Diego';

var template1 = (
    <div>
        <h1>{user.name}</h1>
        <p>Age: {user.age}</p>
        <p>Location: {user.location}</p>

    </div>
);

var appRoute = document.getElementById('app');

ReactDOM.render(template1, appRoute);