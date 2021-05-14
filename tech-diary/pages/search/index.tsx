import Head from 'next/head';
import React from 'react';
import PostSearchContainer from 'container/search/PostSearchContainer';

function SearchPage() {
	return (
		<>
			<Head>
				<title>Work-It (게시글 검색)</title>
				<meta name="description" content="게시글 검색 페이지" />
			</Head>
			<PostSearchContainer />
		</>
	);
}

export default SearchPage;
