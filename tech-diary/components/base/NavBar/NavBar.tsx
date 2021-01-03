import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';

import { color } from 'styles/color';
import { getStorage, removeStorage } from 'libs/storage';
import { Category } from '../Category';
import NavBarItem from './NavBarItem';
import { CategoryItemProps } from '../Category/Category';

const NavBarWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const NavBarBanner = styled.div<{ gradation: string }>`
	width: 100%;
	height: 35rem;
	text-align: center;
	line-height: 20rem;
	${(props) => {
		return css`
			${props.gradation}
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
        background-color: ${color.white};
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
	color: ${color.gray_1};
	cursor: pointer;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
        color: ${color.black};
    `}
`;

const AccountButtonWrap = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1.5rem 10rem auto auto;
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
	color: ${color.gray_1};

	&:hover {
		transition: 0.2s ease-in-out;

		${(props) =>
			props.isScroll
				? `
            color: ${color.gray_3};
        `
				: `
            color: ${color.gray_2};
        `}
	}

	${(props) =>
		props.isScroll &&
		`
        color: ${color.black};
    `}
`;

type Props = {
	gradationEffect: string;
	categorys: Array<CategoryItemProps>;
};

function NavBar({ gradationEffect, categorys }: Props) {
	const [isScroll, setIsScroll] = useState(false);
	const [isToken, setIsToken] = useState(false);

	const handleIsScrollEvent = useCallback(() => {
		if (window.scrollY > 100) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	}, []);

	const onLogout = () => {
		removeStorage('tech-token');
	};

	useEffect(() => {
		window.addEventListener('scroll', handleIsScrollEvent);
	}, [handleIsScrollEvent]);

	useEffect(() => {
		const token = getStorage('tech-token');

		if (token) {
			setIsToken(true);
		} else {
			setIsToken(false);
		}
	}, [isToken]);

	return (
		<NavBarWrap>
			<NavBarBanner gradation={gradationEffect} />
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
					<AccountButtonWrap>
						<Link href="/login">
							<AccountButton isScroll={isScroll} onClick={onLogout}>
								Log out
							</AccountButton>
						</Link>
					</AccountButtonWrap>
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
			</NavBarContent>
			<Category categorys={categorys} />
		</NavBarWrap>
	);
}

export default NavBar;
