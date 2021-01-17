import { useCallback, useEffect, useState } from 'react';

function useRequest(request: any) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});

	const onRequest = useCallback(
		async (params: any) => {
			setLoading(true);
			try {
				const response = await request(params);
				setData(response.data);
			} catch (error) {
				setLoading(false);
			} finally {
				setLoading(false);
			}
		},
		[request]
	);

	return [data, loading, onRequest];
}

// export const requestPostBookMark = (params) => {};
export default useRequest;
