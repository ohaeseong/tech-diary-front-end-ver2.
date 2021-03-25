import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { GET_POST_LIST_REQUEST } from 'store/modules/post';

const useDetailPost = (postId: string) => {
	const dispatch = useDispatch();
	const { postData, loading } = useSelector((state: RootState) => state.post);
	const [limit, setLimit] = useState(30);

	const fetchBlogData = useCallback(() => {
		dispatch({
			type: GET_POST_LIST_REQUEST,
			payload: {
				postId,
			},
		});
	}, [dispatch, postId]);

	useEffect(() => {
		fetchBlogData();
	}, [fetchBlogData, limit]);

	return { postData, loading, limit, setLimit };
};

export default useDetailPost;
