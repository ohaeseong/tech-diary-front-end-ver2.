import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import Switch from 'react-switch';
import { RiMoonClearFill } from 'react-icons/ri';
import { FaSun } from 'react-icons/fa';

import { color } from 'styles/color';
import { getStorage, removeStorage } from 'libs/storage';
import NavBarItem from 'components/base/NavBar/NavBarItem';
import MenuSlider from 'components/common/MenuSlider';
import MenuItem from 'components/common/MenuItem';
import { UserInfo } from 'store/types/auth.types';
import { useRouter } from 'next/router';
import useMenuSliderHeight from 'libs/hooks/useMenuSliderHeight';
import { RootState } from 'store/modules';
import { useSelector } from 'react-redux';
import { mediaQuery } from 'components/layout/responsive';
// import { useSelector } from 'react-redux';
// import { RootState } from 'store/modules';

const NavBarWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const NavBarContent = styled.div<{ isScroll: boolean; isMain?: boolean }>`
	position: fixed;
	width: 100%;
	height: 5rem;
	display: flex;
	flex-direction: row;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
		z-index: 100;
        background-color: ${props.theme.white};
        box-shadow: 0 2px 6px 0 ${color.shadow};
	`}

	${(props) =>
		props.isMain === false &&
		`
		z-index: 100;
        background-color: ${props.theme.white};
		box-shadow: 0 2px 6px 0 ${color.shadow};
    `}

	${mediaQuery(767)} {
		z-index: 100;
		background-color: ${(props) => props.theme.white};
		box-shadow: 0 2px 6px 0 ${color.shadow};
	}
`;

const AccountButtonWrap = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0rem 5rem auto auto;
`;

const SwitchWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5rem;
	height: 100%;
	margin-right: 2.5rem;
	${mediaQuery(767)} {
		margin-right: 1rem;
	}
`;

const IconWrap = styled.div`
	display: flex;
	width: 100%;
	height: 100%;

	align-items: center;
	justify-content: center;
`;

const ProfileWrap = styled.div`
	width: 2rem;
	height: 2rem;

	margin: auto 5rem auto auto;
	${mediaQuery(767)} {
		margin: auto 1rem auto auto;
	}
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;

	border-radius: 50%;

	&:hover {
		cursor: pointer;
	}
`;

const Logo = styled.span<{ isScroll: boolean; isMain?: boolean }>`
	display: block;
	color: ${color.gray_0};
	margin-left: 10rem;
	font-size: 1.3rem;
	padding: 2rem 1rem;
	cursor: pointer;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
        color: ${props.theme.black};
	`}

	${(props) =>
		props.isMain === false &&
		`
        color: ${props.theme.black};
	`}

	${mediaQuery(767)} {
		margin-left: 1rem;
		font-size: 1rem;
		color: ${(props) => props.theme.black};
	}
`;

type Props = {
	isDark: boolean;
	handleIsDarkState: any;
	isMain?: boolean;
};

function NavBar({ isDark, handleIsDarkState, isMain }: Props) {
	const [isScroll, setIsScroll] = useState(false);
	const [isToken, setIsToken] = useState(false);
	const [userProfileImage, setUserProfileImage] = useState('/image/user.png');
	const [memberId, setMemberId] = useState('');
	const [menuHeight, menuToggle, closeMenu] = useMenuSliderHeight(150);
	const { profileImage } = useSelector((state: RootState) => state.auth);

	// const token = useSelector((state: RootState) => state.auth.token);
	// const githubLoginToken = useSelector((state: RootState) => state.githubAuth.token);

	const router = useRouter();

	const handleIsScrollEvent = useCallback(() => {
		if (!isMain) {
			return;
		}

		if (window.scrollY > 100) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	}, [isMain]);

	const goToProfile = useCallback(() => {
		const userStorageInfo = getStorage('user-info') as UserInfo;
		const userPageUrl = `${userStorageInfo.memberId}`;

		router.push(`/${userPageUrl}`);
	}, [router]);

	const onLogout = () => {
		removeStorage('tech-token');
		removeStorage('user-info');

		if (router.pathname === '/') {
			router.reload();
		} else {
			router.push('/');
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleIsScrollEvent);

		return () => {
			window.removeEventListener('scroll', handleIsScrollEvent);
		};
	}, [handleIsScrollEvent]);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const userStorageInfo = getStorage('user-info') as UserInfo;

		if (token && userStorageInfo) {
			setIsToken(true);
			if (userStorageInfo.profileImage) {
				setUserProfileImage(userStorageInfo.profileImage);
			}

			setMemberId(userStorageInfo.memberId);
		} else {
			setIsToken(false);
		}
	}, [isToken]);

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
		<NavBarWrap>
			<NavBarContent isScroll={isScroll} isMain={isMain}>
				<Link href="/">
					<Logo isScroll={isScroll} isMain={isMain}>
						Walk It
					</Logo>
				</Link>
				{/* <NavBarItem url="/" isScroll={isScroll} isMain={isMain}>
					Blog
				</NavBarItem>
				<NavBarItem url="/portfolio" isScroll={isScroll} isMain={isMain}>
					Portfolio
				</NavBarItem> */}
				{isToken ? (
					<ProfileWrap>
						<ProfileImage src={userProfileImage} onClick={menuToggle} alt="profile_image" />
						<MenuSlider height={menuHeight}>
							<MenuItem onClick={goToProfile}>내 정보</MenuItem>
							<MenuItem onClick={() => router.push('/write')}>글 쓰러 가기</MenuItem>
							<MenuItem onClick={() => router.push(`/${memberId}/save`)}>임시글 보러가기</MenuItem>
							<MenuItem onClick={() => router.push(`/${memberId}/bookmark`)}>북마크한 글 보러가기</MenuItem>
							<MenuItem onClick={onLogout}>로그아웃</MenuItem>
						</MenuSlider>
					</ProfileWrap>
				) : (
					<AccountButtonWrap>
						<NavBarItem url="/login" isScroll={isScroll} isMain={isMain}>
							Log in
						</NavBarItem>
						<NavBarItem url="/signup" isScroll={isScroll} isMain={isMain}>
							Sign up
						</NavBarItem>
					</AccountButtonWrap>
				)}
				<SwitchWrap>
					<Switch
						checked={isDark}
						onChange={() => handleIsDarkState()}
						checkedIcon={
							<IconWrap>
								<FaSun color="#F5B7B1" />
							</IconWrap>
						}
						uncheckedIcon={
							<IconWrap>
								<RiMoonClearFill color="#F4D03F" />
							</IconWrap>
						}
						onColor={color.neon_0}
						offColor={color.black}
					/>
				</SwitchWrap>
			</NavBarContent>
		</NavBarWrap>
	);
}

export default NavBar;
