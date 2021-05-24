import React, { useEffect, useState } from 'react';

import '../styles/reset.css';
import '../styles/font.css';

import { wrapper } from 'store';
import Head from 'next/head';
import useDarkMode from 'libs/hooks/useDarkMode';
import { ThemeProvider } from '@emotion/react';
import { color, dark } from 'styles/color';
import { NavBar } from 'components/base/NavBar';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Context } from 'node:vm';
import { getStorage, setStorage } from 'libs/storage';
import { GET_USER_INFO } from 'store/sagas/auth/auth.saga';
import { useDispatch } from 'react-redux';
import { UserInfo } from 'store/types/auth.types';

type Props = {
	Component: any;
	pageProps: any;
	cookie: any;
};

function MyApp({ Component, pageProps, cookie }: Props) {
	const [theme, toggleTheme, componentMounted] = useDarkMode();
	const [isMain, setIsMain] = useState(false);
	const [isNotNav, setIsNotNav] = useState(false);

	const dispatch = useDispatch();
	const router = useRouter();

	const themeMode = theme === 'light';

	useEffect(() => {
		if (
			router.pathname === '/' ||
			router.pathname === '/mobile' ||
			router.pathname === '/front-end' ||
			router.pathname === '/back-end' ||
			router.pathname === '/other'
		) {
			setIsMain(true);
		} else {
			setIsMain(false);
		}

		if (
			router.pathname === '/write' ||
			router.pathname === '/login' ||
			router.pathname === '/signup' ||
			router.pathname === '/login/github-callback' ||
			router.pathname === '/register/[memberId]'
		) {
			setIsNotNav(true);
		} else {
			setIsNotNav(false);
		}
	}, [router.pathname]);

	useEffect(() => {
		if (cookie) {
			setStorage('tech-token', cookie.split('=')[1].split('refresh_token')[0]);
			const userStorageInfo = getStorage('user-info') as UserInfo;

			if (!userStorageInfo) {
				dispatch({
					type: GET_USER_INFO,
					payload: {
						token: cookie.split('=')[1].split('refresh_token')[0],
					},
				});
			}
		}
	}, [cookie, dispatch]);

	if (!componentMounted) return <></>;

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>work-it</title>
				{/* <meta name="description" content="당신의 지식을 공유해 주세요! 지식욕을 작동시켜줄 블로그 \"워크"\ 잇입니다." />
				<meta property="fb:app_id" content="203040656938507" />
				<meta property="og:image" content="https://images.velog.io/velog.png" /> */}
				<style>{`
						@font-face {
							font-family: 'Spoqa Han Sans Regular';
							font-weight: 400;
							font-display: swap;
							src: local('Spoqa Han Sans Regular'), url('/fonts/Spoqa Han Sans Neo Regular.woff2') format('woff2');
						}
						@font-face {
							font-family: 'Spoqa Han Sans Thin';
							font-weight: 400;
							font-display: swap;
							src: local('Spoqa Han Sans Thin'), url('/fonts/Spoqa Han Sans Neo Light.woff2') format('woff2');
						}
						@font-face {
							font-family: 'Spoqa Han Sans Medium';
							font-weight: 400;
							font-display: swap;
							src: local('Spoqa Han Sans Medium'), url('/fonts/Spoqa Han Sans Neo Medium.woff2') format('woff2');
						}
						@font-face {
							font-family: 'Spoqa Han Sans Bold';
							font-weight: 400;
							font-display: swap;
							src: local('Spoqa Han Sans Bold'), url('/fonts/Spoqa Han Sans Neo Bold.woff2') format('woff2');
						}
				`}</style>
			</Head>
			<ThemeProvider theme={themeMode ? dark : color}>
				{isNotNav ? <></> : <NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={isMain} />}
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

MyApp.getInitialProps = async (context: Context) => {
	const { ctx, Component } = context;
	let pageProps = {};
	const cookie = ctx.req.headers.cookie || '';

	if (ctx.isServer && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return { pageProps, cookie };
};

export default wrapper.withRedux(MyApp);
