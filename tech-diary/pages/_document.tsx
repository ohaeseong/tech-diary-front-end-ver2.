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
					<link rel="preconnect" href="/fonts/Spoqa Han Sans Neo Regular.woff2" crossOrigin="true" />
					<link rel="preload" href="/fonts/Spoqa Han Sans Neo Light.woff2" as="font" type="font/woff2" crossOrigin="" />
					<link
						rel="preload"
						href="/fonts/Spoqa Han Sans Neo Regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Spoqa Han Sans Neo Medium.woff2"
						as="font"
						type="font/woff2"
						crossOrigin=""
					/>
					<link rel="preload" href="/fonts/Spoqa Han Sans Neo Bold.woff2" as="font" type="font/woff2" crossOrigin="" />
					<noscript>
						<link rel="stylesheet" href="/fonts/Spoqa Han Sans Neo Regular.woff2" />
					</noscript>
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
