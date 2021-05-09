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
			router.pathname === '/mobeil' ||
			router.pathname === 'frontend' ||
			router.pathname === 'backend' ||
			router.pathname === 'other'
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
				{/* <meta charSet="utf-8" />
				<link
					rel="preload"
					href="/fonts/Spoqa Han Sans Neo Light.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/> */}
				{/* <link rel="preload" href="/fonts/Spoqa Han Sans Neo Regular.woff2" as="font" type="font/woff2" crossOrigin="" /> */}
				{/* <link
					rel="preload"
					href="/fonts/Spoqa Han Sans Neo Medium.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/Spoqa Han Sans Neo Bold.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/> */}
			</Head>
			<ThemeProvider theme={themeMode ? dark : color}>
				{isNotNav ? <></> : <NavBar isDark={themeMode} handleIsDarkState={toggleTheme} isMain={isMain} />}
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default wrapper.withRedux(MyApp);
