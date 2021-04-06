import { combineReducers } from 'redux';
import auth from './auth';
import githubAuth from './github.auth';
import post from './post';
import write from './write';
import theme from './theme.state';
import toast from './toast';
import modal from './modal';
import registerWithGithub from './register.github.auth';
import postComment from './post.comment.count';

const rootReducer = combineReducers({
	auth,
	githubAuth,
	post,
	theme,
	toast,
	postComment,
	modal,
	registerWithGithub,
	write,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
