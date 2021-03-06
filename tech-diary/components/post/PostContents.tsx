import React from 'react';
import styled from '@emotion/styled';
import MarkdwonRenderer from 'components/common/MarkdownRenderer';
import { mediaQuery } from 'components/layout/responsive';

const ContentsWrap = styled.div`
	width: 100%;
	min-height: 30rem;
	padding: 1rem;

	${mediaQuery(768)} {
		padding: 0rem;
		padding-top: 1rem;
	}
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
