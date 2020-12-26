import { combineReducers } from 'redux';
import auth from './auth';
import githubAuth from './github.auth';
import post from './post';

const rootReducer = combineReducers({
    auth,
    githubAuth,
    post,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;