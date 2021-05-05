import { useCallback, useState } from 'react';

function useRequest(request: any, getResponseToCB?: boolean) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<Error | null>(null);

	const onRequest = useCallback(
		async (params: any) => {
			try {
				setData(null);
				setLoading(true);
				const response = await request(params);
				setData(response.data);
				console.log(response);
				
				if (getResponseToCB) {
					return response.data;
				}
			} catch (e) {
				setError(e);
				// throw e;
			}
			setLoading(false);
		},
		[getResponseToCB, request]
	);

	return [data, loading, onRequest, error] as const;
}

export default useRequest;
