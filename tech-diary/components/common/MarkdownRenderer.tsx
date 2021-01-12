import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';

import {
	InlineCodeBlock,
	CodeBlock,
	BlockQuote,
	Strong,
	ImageMarkdownRender,
	ListMarkdownRander,
	UlMarkdownRander,
	OlMarkdownRander,
} from 'libs/markdownCustomRender';

const MarkDownStyle = styled.div`
	color: ${(props) => props.theme.black};
	/* font-size: 1.125rem; */
	line-height: 2.5rem;
	font-display: swap;

	@font-face {
		font-family: 'Spoqa Han Sans';
		font-style: normal;
		font-weight: 400;
		src: local('Spoqa Han Sans'), local('Spoqa Han Sans');
		font-display: swap;
	};
`;

type Props = {
	markdown: string;
};

function MarkdwonRenderer({ markdown }: Props) {
	return (
		<MarkDownStyle>
			<ReactMarkdown
				children={markdown}
				renderers={{
					inlineCode: InlineCodeBlock,
					code: CodeBlock,
					blockquote: BlockQuote,
					strong: Strong,
					image: ImageMarkdownRender,
					list: OlMarkdownRander,
					listItem: ListMarkdownRander,
				}}
			 />
		</MarkDownStyle>
	);
}

export default MarkdwonRenderer;
