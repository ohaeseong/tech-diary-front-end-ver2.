import { useCallback, useState } from 'react';

function useRequest(request: any, getResponseForCB?: boolean) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState<Error | null>(null);

	const onRequest = useCallback(
		async (params: any) => {
			try {
				setData(null);
				setLoading(true);
				const response = await request(params);
				setData(response.data);
				if (getResponseForCB) {
					return response.data;
				}
			} catch (e) {
				setError(e);
				throw e;
			}
			setLoading(false);
		},
		[getResponseForCB, request]
	);

	return [data, loading, onRequest, error];
}

export default useRequest;
