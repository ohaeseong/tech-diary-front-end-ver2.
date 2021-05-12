import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from 'store/modules';
import SignUpTemplate from 'components/account/signup/SignUpTemplate';
import { AUTH_REGISTER_REQUEST } from 'store/modules/register.auth';

function SignUpContainer() {
	const router = useRouter();

	const [memberId, setMemberId] = useState('');
	const [memberName, setMemberName] = useState('');
	const [memberPw, setMemberPw] = useState('');
	const [introduce, setIntroduce] = useState('');

	const errorMsg = useSelector((state: RootState) => state.registerAuth.authRegisterErrorMsg);
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
			type: AUTH_REGISTER_REQUEST,
			payload: {
				memberId,
				memberName,
				introduce,
				code: router.query.code,
				pw: memberPw,
				successCB: () => {
					router.push('/');
				},
				failCB: () => {
					router.push('/');

					toast.error('잘못된 접근입니다.', {
						position: toast.POSITION.TOP_RIGHT,
					});
				},
			},
		});
	}, [dispatch, introduce, memberId, memberName, memberPw, router]);

	const cancleRegister = useCallback(() => {
		router.push('/');
	}, [router]);

	useEffect(() => {
		if (router.query) {
			setMemberId(router.query.memberId as string);
			setMemberName(router.query.member_name as string);
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
