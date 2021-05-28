import { logout } from 'libs/repository';
import { removeStorage } from 'libs/storage';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { SET_USER_INFO_STATE } from 'store/modules/auth';
import { UserInfo } from 'store/types/auth.types';

function useHeader() {
	const { userInfo } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const router = useRouter();

	const onLogout = useCallback(async () => {
		try {
			window.location.href = 'http://localhost:8888/api/auth/logout';
		} catch (error) {
			console.log(error);
		}
		removeStorage('user-info');
		removeStorage('tech-token');
		dispatch({
			type: SET_USER_INFO_STATE,
			payload: null,
		});
		// if (router.pathname === '/') {
		// 	router.reload();
		// } else {
		// 	router.push('/');
		// }
	}, [dispatch]);

	return [userInfo, onLogout] as [UserInfo, () => void];
}

export default useHeader;
