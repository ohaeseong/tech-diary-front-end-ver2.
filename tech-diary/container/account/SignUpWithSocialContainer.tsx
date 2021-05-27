import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SignUpWithGithubTemplate from 'components/account/signup/SignUpTemplate';
import { useRouter } from 'next/router';
// import useRequest from 'libs/hooks/useRequest';
import { useDispatch } from 'react-redux';
import { AUTH_LOGIN_REQUEST } from 'store/modules/auth';
// import { SOCIAL_REGISTER_REQUEST } from 'store/modules/register.github.auth';
// import { RootState } from 'store/modules';

function SignUpWithSocialContainer() {
	const router = useRouter();

	const [memberId, setMemberId] = useState('');
	const [memberName, setMemberName] = useState('');
	const [introduce, setIntroduce] = useState('');

	// const errorMsg = useSelector((state: RootState) => state.registerWithGithub.authRegisterErrorMsg);
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
			type: AUTH_LOGIN_REQUEST,
			payload: {
				memberId,
				memberName,
				introduce,
				socialId: router.query.social_id,
				profileImage: router.query.profile_image,
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
		// window.history.replaceState(null, '', '/register');
	}, []);

	return (
		<SignUpWithGithubTemplate
			cancleRegister={cancleRegister}
			isSocial
			memberId={memberId}
			memberName={memberName}
			introduce={introduce}
			errorMsg=""
			handleMemberId={handleMemberId}
			handleIntroduce={handleIntroduce}
			handleMemberName={handleMemberName}
			onSubmit={onSubmit}
		/>
	);
}

export default SignUpWithSocialContainer;
