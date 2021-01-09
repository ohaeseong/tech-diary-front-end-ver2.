import React from 'react';

import Head from 'next/head';
import PostDetailLayout from 'container/PostDetail/PostDetailLayout';
import MainTemplate from 'components/template/mainTemplate/MainTemplate';

function DetailPage() {
	return (
		<>
			<Head>
				<title>Blog detail page</title>
				<meta name="description" content="블로그 상세조회 페이지입니다." />
			</Head>
			<MainTemplate isNav={false}>
				<PostDetailLayout />
			</MainTemplate>
		</>
	);
}

export default DetailPage;
