import React, { Component } from 'react';
import Counter from './Counter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


class Counters extends Component {
    render() {
        const { onReset, onDelete, onIncrement, onDecrement, onStatus } = this.props;

        return (
        <div>
            {this.props.counters.map(counter => (
                <div class="hourlyFrame">
                    <Counter 
                        key={counter.id} 
                        onDelete={onDelete} 
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                        onStatus={onStatus}
                        counter = {counter}>
                        {counter.hour}
                    </Counter>
                </div>
            ))} 
            <div>
                <button 
                    onClick={onReset}
                    className="btn btn-primary btn-sm m-2">
                    Reset
                </button>
            </div>
        </div> 
        );
    }
}
 
export default Counters;