import { server } from 'config/config';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="shortcut icon" href="/static/favicon.png" />
					<meta property="og:image" content={`${server.client_url}/static/logo_template.png`} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
