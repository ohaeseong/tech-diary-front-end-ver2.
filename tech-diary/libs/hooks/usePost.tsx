import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { GET_POST_LIST_REQUEST } from 'store/modules/post';

const usePost = (category: string, kinds: string) => {
	const dispatch = useDispatch();
	const { postData, loading } = useSelector((state: RootState) => state.post);
	const [limit, setLimit] = useState(30);

	const fetchBlogData = useCallback(() => {
		dispatch({
			type: GET_POST_LIST_REQUEST,
			payload: {
				limit,
				category,
				kinds,
			},
		});
	}, [category, dispatch, kinds, limit]);

	useEffect(() => {
		if (limit !== 10) {
			fetchBlogData();
		}
	}, [fetchBlogData, limit]);

	return { postData, loading, limit, setLimit };
};

export default usePost;
