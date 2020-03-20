import React from 'react';

const ListGroup = props => {
    const { categories } = props;

    return ( 
        <ul className="list-group">
            {categories.map(item => (
                <li key={categories._id} className="list-group-item">
                    {categories.name}
                    hi
                </li>
            ))}
        </ul>
     );
    
}

export default ListGroup;