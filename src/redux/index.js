import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';

export default store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: true,
});
