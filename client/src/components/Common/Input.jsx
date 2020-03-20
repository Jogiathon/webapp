import React, { Component } from 'react';

class Input extends Component {
    render( name, label, value, onChange, focus ) { 
        return (  
            <div>
                <label htmlForm={name}>{label}</label>
                <input
                    {...focus}
                    value={value}
                    name={name}
                    id={name}
                    type="text" 
                    className="form-control" 
                    onChange={onChange} />
            </div>
        );
    }
}
 
export default Input;