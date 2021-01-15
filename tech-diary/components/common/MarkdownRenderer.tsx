import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';

import {
	InlineCodeBlock,
	CodeBlock,
	BlockQuote,
	ImageMarkdownRender,
	ListMarkdownRender,
	OlMarkdownRender,
	HeadingMarkdownRender,
	ParagraphMarkdownRender,
	HorizontalRuleMarkdownRender,
	StrongMarkdownRender,
	LinkMarkdownRender,
} from 'libs/markdownCustomRender';

const MarkDownStyle = styled.div`
	color: ${(props) => props.theme.white};

	line-height: 2rem;
	font-display: swap;
	white-space: pre-line;
	word-break: keep-all;

	& > p {
		color: ${(props) => props.theme.black};
		font-family: 'Spoqa Han Sans Thin';
	}

	& > h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${(props) => props.theme.black};
		font-family: 'Spoqa Han Sans Bold';
	}

	& > 
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
					image: ImageMarkdownRender,
					list: OlMarkdownRender,
					listItem: ListMarkdownRender,
					heading: HeadingMarkdownRender,
					paragraph: ParagraphMarkdownRender,
					thematicBreak: HorizontalRuleMarkdownRender,
					strong: StrongMarkdownRender,
					link: LinkMarkdownRender,
				}}
			/>
		</MarkDownStyle>
	);
}

export default React.memo(MarkdwonRenderer);
