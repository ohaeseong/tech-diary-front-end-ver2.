import React from 'react';

import { MainTemplate } from 'components/template/MainTemplate';
import Head from 'next/head';

function DetailPage() {
	console.log('test');

	return (
		<>
			<Head>
				<title>Blog detail page</title>
				<meta name="description" content="블로그 상세조회 페이지입니다." />
			</Head>
		</>
	);
}

export default DetailPage;
