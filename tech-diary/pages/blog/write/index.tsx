import React from 'react';
import Head from 'next/head';

// import MainTemplate from 'components/template/mainTemplate/MainTemplate';
// import PostLayout from 'container/post/PostLayout';
import PostEditorContainer from 'container/postWrite/PostEditorContainer';

function BlogWritePage() {
	return (
		<>
			<Head>
				<title>(작성중) Blog write page</title>
				<meta name="description" content="블로그 작성 페이지 입니다." />
			</Head>
			<PostEditorContainer />
		</>
	);
}

export default BlogWritePage;
