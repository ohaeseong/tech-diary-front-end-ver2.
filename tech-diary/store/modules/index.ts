import { combineReducers } from 'redux';
import auth from './auth';
import githubAuth from './github.auth';
import post from './post';
import theme from './theme.state';
import toast from './toast';
import postComment from './post.comment.count';

const rootReducer = combineReducers({
	auth,
	githubAuth,
	post,
	theme,
	toast,
	postComment,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
