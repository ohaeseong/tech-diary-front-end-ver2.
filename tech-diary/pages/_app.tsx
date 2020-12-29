import React from 'react';

import '../styles/reset.css';

import { wrapper } from 'store';

type Props = {
	Component: any;
	pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
	return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
