import Head from 'next/head';
import React from 'react';
import PostSearchContainer from 'container/search/PostSearchContainer';

function SearchPage() {
	return (
		<>
			<Head>
				<title>게시글 검색</title>
			</Head>
			<PostSearchContainer />
		</>
	);
}

export default SearchPage;
