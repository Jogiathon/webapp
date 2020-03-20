import React, { Component } from 'react';
import Counters from './Counters';
import Overlay from './Overlay';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';

const Styles = styled.div`
    .container {
      padding-left:50px;
      padding-right:50px;
    }
    .hourlyFrame {
        margin-left:15px;
        align-text: right;
    }

    .CoolButton {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
        
    }

    .CoolButton:disabled {
        opacity: 0.75;
    }

    .badge {
        min-width: 800px;
    }

    .StatusTrue {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        color: #fff;
        background-color: #c353f1;
        border-color: #6c757d;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
    }
    .StatusFalse {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        color: #fff;
        background-color: #22b906;
        border-color: #6c757d;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
    }
`;


class Schedule extends Component {
    state = {  
        counters: [ 
            {id: 1, value: 0, hour: '12:00', status: 0},
            {id: 2, value: 0, hour: '1:00', status: 0},
            {id: 3, value: 0, hour: '2:00', status: 0},
            {id: 4, value: 0, hour: '3:00', status: 0},
            {id: 5, value: 0, hour: '4:00', status: 0},
            {id: 6, value: 0, hour: '5:00', status: 0},
            {id: 7, value: 0, hour: '6:00', status: 0},
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

    handleStatus = (counter) => {
        const counters =[...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index]={...counter};
        if (counters[index].status === 1)
            counters[index].status = 0;
        else
            counters[index].status = 1;
        this.setState({ counters })
    }

    render() { 
        return ( 
            
            <React.Fragment>
                <main className="container">
                <Overlay totalCounters={this.state.counters.filter(c=> c.value == 0).length}/>
                <Styles>
                    <Counters 
                        counters={this.state.counters}
                        onReset={this.handleReset}
                        onIncrement={this.handleIncrement}
                        onDecrement={this.handleDecrement}
                        onDelete={this.handleDelete}
                        onStatus={this.handleStatus}
                    />
                </Styles>
                </main>
            </React.Fragment>
        );
    }
}
 
export default Schedule;