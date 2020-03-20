import React, { Component } from 'react';
import Schedule from './Schedule';
import {Row} from 'react-bootstrap';

class Weekly extends Component {
    state = {  
        counters: [ 
            {id: 1, value: 0, hour: '12:00'},
            {id: 2, value: 0, hour: '1:00'},
            {id: 3, value: 0, hour: '2:00'},
            {id: 4, value: 0, hour: '3:00'},
            {id: 5, value: 0, hour: '4:00'},
            {id: 6, value: 0, hour: '5:00'},
            {id: 7, value: 0, hour: '6:00'},
        ]
    };

    constructor() {
        super();
    }

    componentDidMount() {
        //This is where you make ajax calls to get data from server
    }
    
    handleIncrement = counter => {
        const counters =[...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index]={...counter};
        if (counters[index].value === 60) return;
        counters[index].value = counters[index].value + 30;
        this.setState({ counters })
    }

    handleDecrement = counter => {
        const counters =[...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index]={...counter};
        if (counters[index].value === 0) return;
        counters[index].value = counters[index].value - 30;
        this.setState({ counters })
    }

    handleReset = () => {
        const counters = this.state.counters.map( c => {
            c.value = 0;
            return c;
        });
        this.setState({ counters});
    };

    handleDelete = (counterId) => {
        //console.log('Event Handler Called', counterId);
        const counters = this.state.counters.filter( c => c.id !== counterId); // where counter's c.id is not equal to counterID  param
        this.setState({ counters : counters }); // can simplify to just counters
    };

    render() { 
        return ( 
            <React.Fragment>
                <Row>
                <Schedule />
                <Schedule />
                <Schedule />
                <Schedule />
                <Schedule />
                <Schedule />
                <Schedule />
                </Row>
            </React.Fragment>
        );
    }
}
 
export default Weekly;