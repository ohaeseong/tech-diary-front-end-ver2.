import { createStore, compose, applyMiddleware } from 'redux';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { env } from 'config/config';
import sagaMiddleWare from './sagas/middleware';
import rootReducer, { RootState } from './modules';
import rootSaga from './sagas';

const makeStore: MakeStore<RootState> = (_: Context) => {
	const middleware = [sagaMiddleWare];

	const enhance = env.isProduction
		? compose(applyMiddleware(...middleware))
		: composeWithDevTools(applyMiddleware(...middleware));

	const store = createStore(rootReducer, enhance);

	sagaMiddleWare.run(rootSaga);

	return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: env.isDevelop as any });
