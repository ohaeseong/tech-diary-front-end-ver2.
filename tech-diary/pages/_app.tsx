import React from 'react';

import '../styles/reset.css';
import '../styles/font.css';

import { wrapper } from 'store';
import Head from 'next/head';

type Props = {
	Component: any;
	pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
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
			<Component {...pageProps} />
		</>
	);
}

export default wrapper.withRedux(MyApp);
