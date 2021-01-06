import { css, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import Switch from 'react-switch';
import { RiMoonClearFill } from 'react-icons/ri';
import { FaSun } from 'react-icons/fa';

import { color, ThemeType } from 'styles/color';
import { getStorage, removeStorage } from 'libs/storage';
import categorys from 'resource/category';
import NavBarItem from 'components/base/NavBar/NavBarItem';
import { Category } from 'components/base/Category';
import MenuSlider from 'components/common/MenuSlider';

const NavBarWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const NavBarBanner = styled.div`
	width: 100%;
	height: 35rem;
	text-align: center;
	line-height: 20rem;
	${(props) => {
		return css`
			${props.theme.gradation}
		`;
	}}
`;

const NavBarContent = styled.div<{ isScroll: boolean }>`
	position: fixed;
	width: 100%;
	height: 5rem;
	display: flex;
	flex-direction: row;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
        background-color: ${props.theme.white};
        z-index: 100;
        box-shadow: 0 2px 6px 0 ${color.shadow};
    `}
`;

const LogoWrap = styled.a<{ isScroll: boolean }>`
	width: 8rem;
	margin-left: 10rem;
	text-align: center;
	line-height: 5rem;
	font-size: 1.5rem;
	color: white;
	cursor: pointer;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
		color: ${props.theme.black};
    `}
`;

const AccountButtonWrap = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1.5rem 5rem auto auto;
`;

const AccountButton = styled.a<{ isScroll: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5rem;
	height: 100%;
	cursor: pointer;
	padding: 0.5rem;
	transition: 0.3s ease-in-out;
	font-size: 1rem;
	color: ${color.gray_0};

	&:hover {
		transition: 0.2s ease-in-out;

		${(props) =>
			props.isScroll
				? `
            color: ${props.theme.gray_3};
        `
				: `
            color: ${props.theme.gray_2};
        `}
	}

	${(props) =>
		props.isScroll &&
		`
        color: ${props.theme.black};
    `}
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
	width: 2.5rem;
	height: 2.5rem;
	/* border: 1px solid white; */
	margin: auto 5rem auto auto;

	&:hover {
		cursor: pointer;
	}
`;

const MenuItem = styled.p`
	width: 100%;

	margin: 0;
	height: 20px;
	text-align: center;
	border-bottom: 0.5px solid ${color.gray_2};
	background-color: ${(props) => props.theme.white};

	font-size: 0.8rem;
	line-height: 1.3rem;

	color: ${(props) => props.theme.black};
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	/* border: 1px solid white; */
	border-radius: 50%;
`;

type Props = {
	isDark: boolean;
	handleIsDarkState: any;
};

function NavBar({ isDark, handleIsDarkState }: Props) {
	const [isScroll, setIsScroll] = useState(false);
	const theme = useTheme();
	const [isToken, setIsToken] = useState(false);
	const [height, setHeight] = useState(0);

	const menuToggle = useCallback(() => {
		if (height === 125) {
			setHeight(0);
		} else {
			setHeight(125);
		}
	}, [height]);

	const closeMenu = useCallback(() => {
		if (height === 125) {
			setHeight(0);
		}
	}, [height]);

	const handleIsScrollEvent = useCallback(() => {
		if (window.scrollY > 100) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	}, []);

	const onLogout = () => {
		removeStorage('tech-token');
		window.location.reload();
	};

	useEffect(() => {
		window.addEventListener('scroll', handleIsScrollEvent);

		return () => {
			window.removeEventListener('scroll', handleIsScrollEvent);
		};
	}, [handleIsScrollEvent]);

	useEffect(() => {
		const token = getStorage('tech-token');

		if (token) {
			setIsToken(true);
		} else {
			setIsToken(false);
		}
	}, [isToken]);

	useEffect(() => {
		document.body.addEventListener('click', closeMenu);

		return () => document.body.removeEventListener('click', closeMenu);
	}, [closeMenu]);

	return (
		<ThemeProvider theme={theme}>
			<NavBarWrap>
				<NavBarBanner />
				<NavBarContent isScroll={isScroll}>
					<Link href="/">
						<LogoWrap isScroll={isScroll}>Tech</LogoWrap>
					</Link>
					<NavBarItem href="/" isScroll={isScroll}>
						Blog
					</NavBarItem>
					<NavBarItem href="/portfolio" isScroll={isScroll}>
						Portfolio
					</NavBarItem>
					{isToken ? (
						<ProfileWrap>
							<ProfileImage src="/image/user.png" onClick={menuToggle} />
							<MenuSlider height={height}>
								<MenuItem></MenuItem>
								<MenuItem />
								<MenuItem />
								<MenuItem />
								<MenuItem />
								<MenuItem onClick={onLogout}>Log out</MenuItem>
							</MenuSlider>
						</ProfileWrap>
					) : (
						<AccountButtonWrap>
							<Link href="/login">
								<AccountButton isScroll={isScroll}>Log in</AccountButton>
							</Link>
							<Link href="/signup">
								<AccountButton isScroll={isScroll}>Sign up</AccountButton>
							</Link>
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
				<Category categorys={categorys} />
			</NavBarWrap>
		</ThemeProvider>
	);
}

export default NavBar;
