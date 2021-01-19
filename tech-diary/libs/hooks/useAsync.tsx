import { useReducer, useEffect } from 'react';

type ActionType = {
	type: string;
	data: any;
	error: string;
};

function reducer<T>(state: T, action: ActionType) {
	switch (action.type) {
		case 'LOADING':
			return {
				loading: true,
				data: null,
				error: null,
			};
			break;
		case 'SUCCESS':
			return {
				loading: false,
				data: action.data,
				error: null,
			};
			break;
		case 'ERROR':
			return {
				loading: false,
				data: null,
				error: action.error,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function useAsync<T>(callback: (params?: any) => void, deps?: Array<any>, skip?: boolean) {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: null,
	});

	const onRequest = async () => {
		dispatch({ type: 'LOADING' });
		try {
			const data = await callback();
			dispatch({ type: 'SUCCESS', data });
		} catch (error) {
			dispatch({ type: 'ERROR', error });
		}
	};

	useEffect(() => {
		if (skip) return;
		onRequest();
	}, [...deps]);

	return [state, onRequest];
}

export default useAsync;
