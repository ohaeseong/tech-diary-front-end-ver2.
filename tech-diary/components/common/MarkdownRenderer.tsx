import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';

import { InlineCodeBlock, CodeBlock, BlockQuote } from 'libs/markdownCustomRender';

const MarkDownStyle = styled.div`
	color: ${(props) => props.theme.gray_5};
	font-size: 1rem;
	line-height: 2.5rem;
`;

type Props = {
	children: string;
};

function MarkdwonRenderer({ children }: Props) {
	return (
		<MarkDownStyle>
			<ReactMarkdown
				renderers={{
					inlineCode: InlineCodeBlock,
					code: CodeBlock,
					blockquote: BlockQuote,
				}}
			>
				{children}
			</ReactMarkdown>
		</MarkDownStyle>
	);
}

export default MarkdwonRenderer;
