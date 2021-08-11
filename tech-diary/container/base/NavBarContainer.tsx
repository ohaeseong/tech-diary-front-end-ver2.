import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { NavBar } from 'components/base/NavBar';
import { toast } from 'react-toastify';
import useMenuSliderHeight from 'libs/hooks/useMenuSliderHeight';
import useToggle from 'libs/hooks/useToggle';
import useRequest from 'libs/hooks/useRequest';
import { reqeustSignUpEmailSend } from 'libs/repository';
import { useRouter } from 'next/router';
import useHeader from 'libs/hooks/useHeader';
import isEmail from 'libs/regEx';
import { useSelector } from 'react-redux';
import { server } from 'config/config';
import { getStorage } from 'libs/storage';
import { RootState } from 'store/modules';

type Props = {
	isDark: boolean;
	handleIsDarkState: any;
	isMain?: boolean;
};

function NavBarContainer({ isDark, handleIsDarkState, isMain }: Props) {
	const [isScroll, setIsScroll] = useState(false);
	const [isToken, setIsToken] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [userProfileImage, setUserProfileImage] = useState(`${server.client_url}/static/user.png`);
	const [memberId, setMemberId] = useState('');
	const [menuHeight, menuToggle, closeMenu] = useMenuSliderHeight(150);
	const [modalIsOpenValue, modalOpenToggle] = useToggle(false);
	const [, , onRequestSendEmail] = useRequest(reqeustSignUpEmailSend, true);
	const [email, setEmail] = useState('');
	const [modalMsg, setModalMsg] = useState({
		isError: false,
		message: '',
	});
	const [userInfo, onLogout] = useHeader();
	const { profileImage } = useSelector((state: RootState) => state.auth);

	const router = useRouter();

	const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);
	const prevScrollTop = useRef(0);
	const handleIsScrollEvent = useCallback(() => {
		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

		if (nextDirection === 'UP') {
			setIsDown(false);
		} else if (nextDirection === 'DOWN' && !isMain) {
			setIsDown(true);
			closeMenu();
		}

		prevScrollTop.current = scrollTop;

		if (isMain && window.scrollY > 100) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	}, [closeMenu, isMain]);

	const goToProfile = useCallback(() => {
		const userPageUrl = `${userInfo.memberId}`;

		router.push(`/${userPageUrl}`);
	}, [router, userInfo]);

	const closeModalBox = useCallback(() => {
		setModalMsg({
			isError: false,
			message: '',
		});
		setEmail('');
		modalOpenToggle();
	}, [modalOpenToggle]);

	const onSendEmail = useCallback(async () => {
		if (!email) {
			setModalMsg({
				isError: true,
				message: '이메일을 작성해 주세요.',
			});

			return;
		}

		if (!isEmail(email)) {
			setModalMsg({
				isError: true,
				message: '이메일 형식이 아니에요.',
			});

			return;
		}

		const req = {
			email,
		};

		const response = await onRequestSendEmail(req);

		if (response.status === 403) {
			setModalMsg({
				isError: true,
				message: '이미 가입된 이메일 입니다.',
			});

			return;
		}

		closeModalBox();
		toast.success('메일함을 확인해 주세요!', {
			position: toast.POSITION.TOP_RIGHT,
		});
	}, [closeModalBox, email, onRequestSendEmail]);

	useEffect(() => {
		window.addEventListener('scroll', handleIsScrollEvent);

		return () => {
			window.removeEventListener('scroll', handleIsScrollEvent);
		};
	}, [handleIsScrollEvent]);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		if (token && userInfo) {
			setIsToken(true);
			if (userInfo.profileImage) {
				setUserProfileImage(userInfo.profileImage);
			}

			setMemberId(userInfo.memberId);
		} else {
			setIsToken(false);
		}
	}, [isToken, router, userInfo]);

	useEffect(() => {
		if (profileImage) {
			setUserProfileImage(profileImage);
		}
	}, [profileImage]);

	useEffect(() => {
		document.body.addEventListener('click', closeMenu);

		return () => document.body.removeEventListener('click', closeMenu);
	}, [closeMenu]);

	return (
		<NavBar
			modalMsg={modalMsg}
			memberId={memberId}
			menuHeight={menuHeight}
			userProfileImage={userProfileImage}
			isToken={isToken}
			isScroll={isScroll}
			modalIsOpenValue={modalIsOpenValue}
			isDown={isDown}
			isMain={isMain}
			handleIsDarkState={handleIsDarkState}
			isDark={isDark}
			email={email}
			closeModalBox={closeModalBox}
			goToProfile={goToProfile}
			onSendEmail={onSendEmail}
			handleEmail={handleEmail}
			onLogout={onLogout}
			menuToggle={menuToggle}
			modalOpenToggle={modalOpenToggle}
		/>
	);
}

export default NavBarContainer;
