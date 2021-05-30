import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SignUpWithGithubTemplate from 'components/account/signup/SignUpTemplate';
import { useRouter } from 'next/router';
// import useRequest from 'libs/hooks/useRequest';
import { useDispatch } from 'react-redux';
// import { AUTH_LOGIN_REQUEST } from 'store/modules/auth';
import { SocialProfile } from 'store/types/auth.types';
import { AUTH_REGISTER_SOCIAL_REQUEST } from 'store/modules/register.with.social';
import { server } from 'config/config';
// import { SOCIAL_REGISTER_REQUEST } from 'store/modules/register.github.auth';
// import { RootState } from 'store/modules';

type Props = {
	userInfo: SocialProfile;
};

function SignUpWithSocialContainer({ userInfo }: Props) {
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
			type: AUTH_REGISTER_SOCIAL_REQUEST,
			payload: {
				memberId,
				memberName,
				introduce,
				socialId: userInfo.socialId,
				profileImage: userInfo.profileImage,
				successCB: () => {
					window.location.href = `${server.host}/auth/delete/register_token`;
				},
			},
		});
	}, [dispatch, introduce, memberId, memberName, userInfo]);

	const cancleRegister = useCallback(() => {
		router.push('/');
	}, [router]);

	useEffect(() => {
		if (userInfo) {
			setMemberId(userInfo.memberId as string);
			setMemberName(userInfo.memberName as string);
		}
	}, [userInfo, userInfo.memberId, userInfo.memberName]);

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
