// root-reducer
import {combineReducers} from 'redux';
import loginSlice from './LoginSlice/loginSlice';

export const rootReducer = combineReducers({
    loginSlice: loginSlice,
});

// export rootReducer;