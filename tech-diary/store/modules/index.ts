import { combineReducers } from 'redux';
import auth from './auth';
import githubAuth from './auth';

const rootReducer = combineReducers({
    auth,
    githubAuth,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;