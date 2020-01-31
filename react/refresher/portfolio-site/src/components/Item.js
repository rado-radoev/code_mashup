import React from 'react';

const Item = (props) => {
    return (
        <div>
            <h1>A Thing I've Done</h1>
            This page is for the item with id: {props.match.params.id}
        </div>
    );
} 

export default Item;