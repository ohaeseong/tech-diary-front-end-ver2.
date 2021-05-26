import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';
import write from './write';
import theme from './theme.state';
import modal from './modal';
import registerAuth from './register.auth';
import postComment from './post.comment.count';

const rootReducer = combineReducers({
	auth,
	post,
	theme,
	postComment,
	modal,
	write,
	registerAuth,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
