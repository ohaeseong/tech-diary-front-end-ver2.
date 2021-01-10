import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { GITHUB_AUTH_LOGIN_REQUEST } from 'store/modules/github.auth';
import Loading from 'components/common/Loading';

function GithubLoginCallback() {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (router.query.code) {
			dispatch({
				type: GITHUB_AUTH_LOGIN_REQUEST,
				payload: {
					code: router.query.code,
					successCB: () => {
						router.push('http://localhost:3000');
					},
				},
			});
		}
	}, [dispatch, router, router.query.code]);

	return <Loading />;
}

export default GithubLoginCallback;
