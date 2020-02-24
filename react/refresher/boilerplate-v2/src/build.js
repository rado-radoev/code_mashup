class VisibilityApp extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Action />
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
        this.setState((prevState) => ({ visibility: !prevState.visibility }))
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

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
}

Header.defaultProps = {
    title: 'Visibility Toggle'
}

const DisplayMessage = (props) => {
    return (
        <div>
            <p>{props.message}</p>
        </div>

    );
}

DisplayMessage.defaultProps = {
    message: 'A message should be displayed here, but none was set. So ... "Hello!"'
}


ReactDOM.render(<VisibilityApp />, document.getElementById('app'));

