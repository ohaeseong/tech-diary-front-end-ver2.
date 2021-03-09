import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import Switch from 'react-switch';
import { RiMoonClearFill } from 'react-icons/ri';
import { FaSun } from 'react-icons/fa';
import jwt from 'jsonwebtoken';

import { color } from 'styles/color';
import { getStorage, removeStorage } from 'libs/storage';
import NavBarItem from 'components/base/NavBar/NavBarItem';
import MenuSlider from 'components/common/MenuSlider';
import MenuItem from 'components/common/MenuItem';
import { TypeDecoded, UserInfo } from 'store/types/auth.types';
import { useRouter } from 'next/router';
import useMenuSliderHeight from 'libs/hooks/useMenuSliderHeight';

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
	font-size: 1rem;
	color: ${color.gray_0};
	padding: 2rem 1rem;
	font-family: 'Spoqa Han Sans';
	margin-left: 10rem;
	font-size: 1.7rem;
	padding: 1.7rem 1rem;
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
`;

type Props = {
	isDark: boolean;
	handleIsDarkState: any;
	isMain?: boolean;
};

function NavBar({ isDark, handleIsDarkState, isMain }: Props) {
	const [isScroll, setIsScroll] = useState(false);
	const [isToken, setIsToken] = useState(false);
	const [profileImage, setProfileImage] = useState('/image/user.png');
	const [menuHeight, menuToggle, closeMenu] = useMenuSliderHeight(150);

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
		const userInfo = getStorage('user-info') as UserInfo;
		const userPageUrl = `${userInfo.memberName}`;

		router.push(`/user/${userPageUrl}`);
	}, []);

	const onLogout = () => {
		removeStorage('tech-token');
		removeStorage('user-info');
		window.location.reload();
	};

	useEffect(() => {
		window.addEventListener('scroll', handleIsScrollEvent);

		return () => {
			window.removeEventListener('scroll', handleIsScrollEvent);
		};
	}, [handleIsScrollEvent]);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		const tokenDecoded = jwt.decode(token) as TypeDecoded;

		if (token && tokenDecoded) {
			setIsToken(true);
			if (tokenDecoded.profileImage) {
				setProfileImage(tokenDecoded.profileImage);
			}
		} else {
			setIsToken(false);
		}
	}, [isToken]);

	useEffect(() => {
		document.body.addEventListener('click', closeMenu);

		return () => document.body.removeEventListener('click', closeMenu);
	}, [closeMenu]);

	return (
		<NavBarWrap>
			<NavBarContent isScroll={isScroll} isMain={isMain}>
				<Link href="/">
					<Logo isScroll={isScroll} isMain={isMain}>
						Tech
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
						<ProfileImage src={profileImage} onClick={menuToggle} alt="profile_image" />
						<MenuSlider height={menuHeight}>
							<MenuItem onClick={goToProfile}>내 정보</MenuItem>
							<MenuItem onClick={() => router.push('/blog/write')}>글 쓰러 가기</MenuItem>
							<MenuItem>임시글 보러가기</MenuItem>
							<MenuItem>북마크한 글 보러가기</MenuItem>
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
