class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        const stringCount = localStorage.getItem('count');
        const count = parseInt(stringCount, 10);

        if (!isNaN(count)) {
            this.setState(() => ( { count } ))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }

    handleAddOne() {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
    }

    handleMinusOne() {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
    }

    handleReset() {
        this.setState((prevState) => ({ count: 0 }));
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter count={100}/>, document.getElementById('app'));





// console.log('app.js is running')

// const app = {
//     title: 'Indecision app',
//     subtitle: 'Let the computer decide for you',
//     options: ['One', 'Two']
// }

// const template = (
//  <div>
//     <h1>{app.title}</h1>
//     {app.subtitle && <p>{app.subtitle}</p>}
//     <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
//     <ol>
//         <li>Item one</li>
//         <li>Item two</li>
//     </ol>
//  </div>
// );

// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp();
// }

// const minusOne = () => {
//     count--;
//     renderCounterApp();
// }

// const reset = () => {
//     count = 0;
//     renderCounterApp();
// }

// const templateTwo = (
//     <div>
//         <h1>Count: {count} </h1>
//         <button onClick={addOne}>+1</button>
//         <button onClick={minusOne}>-1</button>
//         <button onClick={reset}>reset</button>
//     </div>
// );


// const appRoot = document.getElementById('app')

// ReactDOM.render(templateTwo, appRoot);

// const renderCounterApp = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count: {count} </h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     );

//     ReactDOM.render(templateTwo, appRoot);
// };

// renderCounterApp();