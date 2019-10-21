console.log("app.js is running");

// var template = <p>This is JSX from app.js</p>
var template = React.createElement("p", {
    id: "someid"
  }, "This is JSX from app.js");
var appRoute = document.getElementById("app");

ReactDOM.render(template, appRoute);