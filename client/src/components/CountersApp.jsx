import React, { Component } from 'react';
import Counters from './Counters';

class CountersApp extends Component {
    state = {  
        counters: [ 
            {id: 1, value: 4},
            {id: 2, value: 0},
            {id: 3, value: 0},
            {id: 4, value: 0},
        ]
    };

    handleIncrement = counter => {
        const counters =[...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index]={...counter};
        counters[index].value++;
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
        //const counters = this.state.counters
    };

    render() { 
        return ( 
            <main className="container">
            <Counters 
                counters={this.state.counters}
                onReset={this.handleReset}
                onIncrement={this.handleIncrement}
                onDelete={this.handleDelete}
            />
            </main>
         );
    }
}
 
export default CountersApp;