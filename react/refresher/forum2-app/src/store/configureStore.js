import {creatStore, combineReducers} from 'redux';
import commentsReducer from '../reducers/comments';
import filtersReducer from '../reducers/filters';

export default () => {
    const store = creatStore(
        combineReducers({
            comments: commentsReducer,
            filters: filtersReducer
        })
    );

    return store;
}