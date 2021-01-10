import React from 'react';
import styled from '@emotion/styled';
import MarkdwonRenderer from 'components/common/MarkdownRenderer';
import ReactMarkdown from 'react-markdown';

const ContentsWrap = styled.div`
	width: 100%auto;
	min-height: 30rem;

	border: 1px solid black;

	font-size: 1.5rem;
`;

function PostContents() {
	return (
		<ContentsWrap>
			<ReactMarkdown>## Hello, *world*!</ReactMarkdown>
		</ContentsWrap>
	);
}

export default PostContents;
