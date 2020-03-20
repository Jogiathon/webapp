import React, { Component } from 'react';

class Counter extends Component {
    componentDidUpdate(prevProps, prevState){
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
        if (prevProps.counter.value !== this.props.counter.value) {
            //Then perhaps we can get an ajax call and get new data from server, only if the data did not change
        }
    }

    componentWillUnmount() {
        console.log('Counter - Unmount')
    }

    render() {
        console.log('Counter - Rendered')
        return (
            <div>
                <h4>{this.props.children}</h4>
                <span className={this.getBadgeClasses()}>
                    {this.formatCount()}
                </span>
                <button 
                    disabled={this.props.counter.value === 60}
                    onClick={() => this.props.onIncrement(this.props.counter)}
                    className="CoolButton">
                    +
                </button>
                <button 
                    disabled={this.props.counter.value === 0}
                    onClick={() => this.props.onDecrement(this.props.counter)}
                    className="CoolButton">
                    -
                </button>
                <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={ () => this.props.onDelete(this.props.counter.id)}>
                    Delete
                </button>
                <button
                    className={this.getStatusClasses()}
                    onClick={ () => this.props.onStatus(this.props.counter)}>
                    herro
                </button>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

    getStatusClasses() {
        let classes = "Status";
        classes += this.props.counter.status === 0 ? "False" : "True";
        return classes;
    }

    formatCount() {
        const { value: count } = this.props.counter;
        if (count === 0) {
            return "Open";
        }
        else if (count === 60)
            return "Occupied";
        else
            return count;
    }
}

export default Counter;