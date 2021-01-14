import React from 'react';
import styled from '@emotion/styled';
import MarkdwonRenderer from 'components/common/MarkdownRenderer';

const ContentsWrap = styled.div`
	width: 100%;
	min-height: 30rem;
	margin-bottom: 15rem;
	padding: 1rem;
`;

type Props = {
	markdown: string;
};

function PostContents({ markdown }: Props) {
	return (
		<ContentsWrap>
			<MarkdwonRenderer markdown={markdown} />
		</ContentsWrap>
	);
}

export default React.memo(PostContents);
