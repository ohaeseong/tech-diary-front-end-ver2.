import { combineReducers } from 'redux';
import auth from './auth';
import githubAuth from './github.auth';
import post from './post';
import theme from './theme.state';

const rootReducer = combineReducers({
	auth,
	githubAuth,
	post,
	theme,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
