import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GITHUB_REGISTER_REQUEST } from 'store/modules/register.github.auth';
import { RootState } from 'store/modules';
import SignUpTemplate from 'components/account/signup/SignUpTemplate';

function SignUpContainer() {
	const router = useRouter();

	const [memberId, setMemberId] = useState('');
	const [memberName, setMemberName] = useState('');
	const [memberPw, setMemberPw] = useState('');
	const [introduce, setIntroduce] = useState('');

	const errorMsg = useSelector((state: RootState) => state.registerWithGithub.authRegisterErrorMsg);
	const dispatch = useDispatch();

	const handleMemberId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setMemberId(e.target.value);
	}, []);

	const handleMemberName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setMemberName(e.target.value);
	}, []);

	const handleMemberPw = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setMemberPw(e.target.value);
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
		if (router.query) {
			console.log(router.query.code);
		}
	}, [router.query]);

	return (
		<SignUpTemplate
			cancleRegister={cancleRegister}
			memberId={memberId}
			memberName={memberName}
			memberPw={memberPw}
			introduce={introduce}
			errorMsg={errorMsg}
			handleMemberPw={handleMemberPw}
			handleMemberId={handleMemberId}
			handleIntroduce={handleIntroduce}
			handleMemberName={handleMemberName}
			onSubmit={onSubmit}
		/>
	);
}

export default SignUpContainer;
