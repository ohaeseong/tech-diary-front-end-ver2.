/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import '../styles/reset.css';
import '../styles/font.css';

import { wrapper } from 'store';
import Head from 'next/head';
import useDarkMode from 'libs/hooks/useDarkMode';
import { ThemeProvider } from '@emotion/react';
import { color, dark } from 'styles/color';
import { useRouter } from 'next/router';
import { Context } from 'node:vm';
import { getStorage, setStorage } from 'libs/storage';
import { GET_USER_INFO } from 'store/sagas/auth/auth.saga';
import { useDispatch } from 'react-redux';
import { SET_USER_INFO_STATE } from 'store/modules/auth';
import useHeader from 'libs/hooks/useHeader';
import NavBarContainer from 'container/base/navBarContainer';

type Props = {
	Component: any;
	pageProps: any;
	cookies: {
		token: string;
		refreshToken: string;
		userId: string;
	};
};

function MyApp({ Component, pageProps, cookies }: Props) {
	const [theme, toggleTheme, componentMounted] = useDarkMode();
	const [userInfo] = useHeader();
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
		if (cookies && cookies.token) {
			setStorage('tech-token', cookies.token);
		}
		const user = getStorage('user-info');
		if (cookies && cookies.token && !userInfo) {
			dispatch({
				type: GET_USER_INFO,
				payload: {
					userId: cookies.userId,
					successCB: (payload: any) => {
						dispatch({
							type: SET_USER_INFO_STATE,
							payload: payload.member,
						});

						setStorage('user-info', payload.member);
					},
				},
			});

			return;
		}
		if (!user) return;
		dispatch({
			type: SET_USER_INFO_STATE,
			payload: user,
		});
	}, [cookies, dispatch]);

	if (!componentMounted) return <></>;

	return (
		<>
			<Head>
				<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
				<meta property="fb:app_id" content="2111760498954706" />
				{/* <link rel="shortcut icon" href="/static/favicon.png" /> */}
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
				{isNotNav ? <></> : <NavBarContainer isDark={themeMode} handleIsDarkState={toggleTheme} isMain={isMain} />}
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

MyApp.getInitialProps = async (context: Context) => {
	const { ctx, Component } = context;
	let pageProps = {};
	const { req } = ctx;
	let cookies = {
		token: '',
		refreshToken: '',
		userId: '',
	};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	if (req) {
		if (req.cookies) {
			cookies = {
				token: req.cookies.access_token,
				refreshToken: req.cookies.refresh_token,
				userId: req.cookies.user_id,
			};
		}
	}

	return { pageProps, cookies };
};

export default wrapper.withRedux(MyApp);
