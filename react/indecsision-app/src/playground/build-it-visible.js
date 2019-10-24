const appRoute = document.getElementById('app');

const button = {
    state: true
}

const toggleButton = () => {
    button.state = !button.state;
    // console.log(button.state);
    render();
}

const render = () => {
 
    const template = ( 
        <div>
            <h1>Visibility Toggle</h1>
            <button id="btn" key='1' onClick={toggleButton}>
                {button.state ? "Show Details" : "Hide Details"}
            </button>
            {!button.state && 
                <div>
                    <p>Hey. These are some details you can now see.</p>
                </div>
            }
        </div>
        
    );

    ReactDOM.render(template, appRoute);
};

render();

