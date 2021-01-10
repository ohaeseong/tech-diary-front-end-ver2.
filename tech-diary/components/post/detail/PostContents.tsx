import React from 'react';
import styled from '@emotion/styled';
import MarkdwonRenderer from 'components/common/MarkdownRenderer';

const ContentsWrap = styled.div`
	width: 100%;
	min-height: 30rem;
	/* margin-top: 1rem; */
	padding: 1rem;

	color: ${(props) => props.theme.black};
`;

type Props = {
	children: string;
};

function PostContents({ children }: Props) {
	return (
		<ContentsWrap>
			<MarkdwonRenderer>{children}</MarkdwonRenderer>
		</ContentsWrap>
	);
}

export default PostContents;
