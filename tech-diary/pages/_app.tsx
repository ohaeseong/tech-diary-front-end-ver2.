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

type Props = {
	Component: any;
	pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
	const [theme, toggleTheme, componentMounted] = useDarkMode();
	const [isMain, setIsMain] = useState(false);
	const [isNotNav, setIsNotNav] = useState(false);
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

	if (!componentMounted) return <></>;

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
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

export default wrapper.withRedux(MyApp);
