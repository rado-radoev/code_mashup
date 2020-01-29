import React from 'react';
import Option from './Option'

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <button className="button button--link" onClick={props.handleDeleteOptions}>Remove all</button>
        </div>
        <div className="widget__message">
            {props.options.length === 0 && <p>Please, add an option to get started!</p>}
        </div>
        
        {
            props.options.map( (option) => (
                <Option 
                    key={option} 
                    optionText={option}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
        <Option />
    </div>
);

export default Options;