import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

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
	TableMarkdownRender,
	TheadMarkdownRender,
	TbodyMarkdownRender,
} from 'libs/markdownCustomRender';
import { css } from '@emotion/react';

const MarkDownStyle = styled.div<{ type?: string }>`
	color: ${(props) => props.theme.white};

	line-height: 1.8rem;
	font-display: swap;
	white-space: pre-line;
	word-break: break-all;

	${(props) => {
		if (props.type === 'comment') {
			return css`
				& > * {
					font-size: 1rem;
				}
			`;
		}
		return css`
			& > * {
				font-size: 1.125rem;
			}
		`;
	}}

	& > p, em, del {
		color: ${(props) => props.theme.black};
		font-family: 'Spoqa Han Sans Thin';
	}

	& > * h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${(props) => props.theme.black};
		font-family: 'Spoqa Han Sans Bold';
	}

	& > pre code {
		font-size: 0.9rem;
		word-break: break-all;
	}
`;

type Props = {
	markdown: string;
	type?: string;
};

function MarkdwonRenderer({ markdown, type }: Props) {
	return (
		<MarkDownStyle type={type}>
			<ReactMarkdown
				children={markdown}
				plugins={[gfm]}
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
					table: TableMarkdownRender,
					tableHead: TheadMarkdownRender,
					tableBody: TbodyMarkdownRender,
				}}
			/>
		</MarkDownStyle>
	);
}

export default React.memo(MarkdwonRenderer);
