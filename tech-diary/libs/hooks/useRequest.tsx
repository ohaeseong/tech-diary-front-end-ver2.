import { useCallback, useEffect, useState } from 'react';

function useRequest(request: any) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});

	const onRequest = useCallback(
		async (params: any) => {
			try {
				setLoading(true);
				const response = await request(params);
				console.log(response);
				
				setData(response.data);
			} catch (error) {
				setLoading(false);
			}

			setLoading(false);
		},
		[request]
	);

	return [data, loading, onRequest];
}

// export const requestPostBookMark = (params) => {};
export default useRequest;
