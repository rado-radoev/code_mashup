import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByAmount, sortByDate, setEndDate, setStartDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';
import uuid from 'uuid';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}));
    };

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input_group__item">
                        <input 
                            type="text" 
                            placeholder="Search expenses"
                            className="text-input"
                            value={this.props.filters.text} 
                            onChange={(e) => {
                                this.props.dispatch(setTextFilter(e.target.value))
                                console.log(e.target.value)
                            }}
                        />
                    </div>
                    <div className="input_group__item">
                        <select 
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={(e) => {
                                const selectedValue = e.target.value
                                switch (selectedValue) {
                                    case 'amount':
                                        this.props.dispatch(sortByAmount());
                                        break;
                                    case 'date':
                                        this.props.dispatch(sortByDate());
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
                    <div className="input_group__item">
                        <DateRangePicker 
                            startDateId={uuid()}
                            endDateId={uuid()}
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);