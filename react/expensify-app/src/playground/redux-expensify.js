import { createStore, combineReducers } from 'redux';

const demo = {
    expenses: [{
        id: 'idgoeshere',
        description: 'January rent',
        note: 'This is the final payment for that address',
        amount: 54500,
        createdAt:0 
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};