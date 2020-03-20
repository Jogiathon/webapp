import React from 'react';

const Overlay = (props) => {
        return (  
            <span className="badge badge-pill badge-secondary"> 
                {props.totalCounters}
            </span>
        );
    }
export default Overlay;