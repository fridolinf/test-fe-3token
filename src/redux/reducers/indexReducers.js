import { combineReducers } from 'redux';
import dataReducers from './reducers';
const rootReducer = combineReducers({
	dataReducers,
});

export default rootReducer;
