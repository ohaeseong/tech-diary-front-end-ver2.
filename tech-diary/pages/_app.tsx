import React from 'react';

import '../styles/reset.css';
import '../styles/font.css';

import { wrapper } from 'store';
import Head from 'next/head';
// import useDarkMode from 'libs/hooks/useDarkMode';
// import { ThemeProvider } from '@emotion/react';
// import { color, dark } from 'styles/color';

type Props = {
	Component: any;
	pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
	// const [theme, , ] = useDarkMode();

	// const themeMode = theme === 'light';
	return (
		<>
			<Head>
				{/* <link
					rel="preload"
					href="/fonts/Spoqa Han Sans Neo Light.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/fonts/Spoqa Han Sans Neo Regular.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
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
			{/* <ThemeProvider theme={themeMode ? dark : color}> */}
			<Component {...pageProps} />
			{/* </ThemeProvider> */}
		</>
	);
}

export default wrapper.withRedux(MyApp);
