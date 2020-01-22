class VisibilityApp extends React.Component {
    render() {
        const title = 'Visibility Toggle';
        return (
            <div>
                <Header title={title} />
                <Action />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

class Action extends React.Component {  
    constructor(props) {
        super(props);
        this.handleToggleView = this.handleToggleView.bind(this);
        this.state = {
            visibility: false
        }
    }

    handleToggleView() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleToggleView}>{this.state.visibility ? 'Hide details' : 'Show details'}</button>
                {this.state.visibility && <DisplayMessage message='Hey.These are some details you can now see!'/> }
            </div>
        );
    }
}

class DisplayMessage extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.message}</p>
            </div>
        );
    }
}


ReactDOM.render(<VisibilityApp />, document.getElementById('app'));


// const appRoot = document.getElementById('app');

// const button = {
//     clicked: false
// }

// const toggle = () => {
//     button.clicked = !button.clicked
//     render();
// }

// const render = () => {

//     const template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={toggle}>{button.clicked ? 'Hide details' : 'Show details'}</button>
//             {button.clicked && <p>Hey.These are some details you can now see!</p>}
//         </div>
//     );

//     ReactDOM.render(template, appRoot);
// }

// render();

