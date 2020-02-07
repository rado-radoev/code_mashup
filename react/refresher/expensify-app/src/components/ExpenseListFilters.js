import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByAmount, sortByDate} from '../actions/filters';

const ExpenseListFilters = (props) => (
    <div>
        <input 
            ype="text" 
            value={props.filters.text} 
            onChange={(e) => {
                props.dispatch(setTextFilter(e.target.value))
                console.log(e.target.value)
            }}
        />

        <select 
            value={props.filters.sortBy}
            onChange={(e) => {
                const selectedValue = e.target.value
                switch (selectedValue) {
                    case 'amount':
                        props.dispatch(sortByAmount());
                        break;
                    case 'date':
                        props.dispatch(sortByDate());
                        break;
                    default:
                        break;
                }
            }}
        >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);