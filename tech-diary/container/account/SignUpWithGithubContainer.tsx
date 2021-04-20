import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SignUpWithGithubTemplate from 'components/account/signup/SignUpTemplate';
import { useRouter } from 'next/router';
// import useRequest from 'libs/hooks/useRequest';
import { useDispatch, useSelector } from 'react-redux';
import { GITHUB_REGISTER_REQUEST } from 'store/modules/register.github.auth';
import { RootState } from 'store/modules';

function SignUpWithGithubContainer() {
	const router = useRouter();

	const [memberId, setMemberId] = useState('');
	const [memberName, setMemberName] = useState('');
	const [introduce, setIntroduce] = useState('');

	const errorMsg = useSelector((state: RootState) => state.registerWithGithub.authRegisterErrorMsg);
	const dispatch = useDispatch();

	const handleMemberId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setMemberId(e.target.value);
	}, []);

	const handleMemberName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setMemberName(e.target.value);
	}, []);

	const handleIntroduce = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setIntroduce(e.target.value);
	}, []);

	const onSubmit = useCallback(() => {
		dispatch({
			type: GITHUB_REGISTER_REQUEST,
			payload: {
				memberId,
				memberName,
				introduce,
				githubId: router.query.github_id,
				avatarUrl: router.query.profile_image,
				successCB: () => {
					router.push('/');
				},
			},
		});
	}, [dispatch, introduce, memberId, memberName, router]);

	const cancleRegister = useCallback(() => {
		router.push('/');
	}, [router]);

	useEffect(() => {
		if (router.query) {
			setMemberId(router.query.memberId as string);
			setMemberName(router.query.member_name as string);
		}
	}, [router.query]);

	useEffect(() => {
		window.history.replaceState(null, '', '/register');
	}, []);

	return (
		<SignUpWithGithubTemplate
			cancleRegister={cancleRegister}
			isGithub
			memberId={memberId}
			memberName={memberName}
			introduce={introduce}
			errorMsg={errorMsg}
			handleMemberId={handleMemberId}
			handleIntroduce={handleIntroduce}
			handleMemberName={handleMemberName}
			onSubmit={onSubmit}
		/>
	);
}

export default SignUpWithGithubContainer;
