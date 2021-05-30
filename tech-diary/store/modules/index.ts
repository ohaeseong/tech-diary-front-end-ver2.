import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import write from './write';
import theme from './theme.state';
import modal from './modal';
import registerAuth from './register.auth';
import socialAuth from './register.with.social';
import postComment from './post.comment.count';

const rootReducer = combineReducers({
	auth,
	post,
	theme,
	postComment,
	modal,
	write,
	socialAuth,
	registerAuth,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
