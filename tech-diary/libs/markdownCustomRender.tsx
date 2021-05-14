import React from 'react';
import styled from '@emotion/styled';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import Image from 'next/image';

export function CodeBlock(children: { value: string; language: string }) {
	if (!children.value) {
		return (
			<SyntaxHighlighter language={children.language} style={darcula}>
				{' '}
			</SyntaxHighlighter>
		);
	}
	return (
		<SyntaxHighlighter language={children.language} style={darcula}>
			{children.value}
		</SyntaxHighlighter>
	);
}

const BlockQuoteStyle = styled.div`
	border-left: 5px solid ${(props) => props.theme.neon_2};
	color: ${(props) => props.theme.black};
	padding: 1rem;
	margin: 2rem auto;
	background-color: ${(props) => props.theme.info};

	& > * {
		color: ${(props) => props.theme.black};
		font-family: 'Spoqa Han Sans Thin';
		/* font-size: 0.9rem; */
	}
`;

export function BlockQuote(children: { children: React.ReactNode }) {
	return <BlockQuoteStyle>{children.children}</BlockQuoteStyle>;
}

const InlinCode = styled.em`
	background: ${(props) => props.theme.emphasis};
	padding: 2px 4px;
	font-size: 1rem;
	border-radius: 2px;
	font-style: normal;
`;

export function InlineCodeBlock(children: { value: React.ReactNode }) {
	return <InlinCode>{children.value}</InlinCode>;
}

const ImageWrap = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: auto;
`;

const ImageStyle = styled.img`
	max-width: 100%;
	/* height: auto; */

	margin: 1.5rem auto;

	object-fit: contain;
`;

export function ImageMarkdownRender(children: { src: string }) {
	return (
		<ImageWrap>
			<ImageStyle src={children.src} alt="post_image" />
			{/* <style>{`
				.postImage {
					margin: 1rem auto;
				}
			`}</style> */}
		</ImageWrap>
	);
}

const ListStyle = styled.li`
	color: ${(props) => props.theme.black};
	& > * {
		font-family: 'Spoqa Han Sans Thin';
	}
`;

export function ListMarkdownRender(children: { children: React.ReactNode }) {
	return <ListStyle>{children.children}</ListStyle>;
}

const UlStyle = styled.ul`
	padding-left: 2rem;
	list-style-type: disc;
	color: ${(props) => props.theme.black};

	& > * {
		font-family: 'Spoqa Han Sans Thin';
	}
`;

const OlStyle = styled.ol`
	list-style-type: decimal;
	padding-left: 2rem;
	margin: 1rem auto;
	color: ${(props) => props.theme.black};

	& > * {
		font-family: 'Spoqa Han Sans Regular';
	}
`;

export function OlMarkdownRender(children: { children: string; ordered: boolean; start: number }) {
	if (children.ordered) {
		return <OlStyle start={children.start}>{children.children}</OlStyle>;
	}
	return <UlStyle>{children.children}</UlStyle>;
}

const HeadingStyled = styled.div`
	margin: 1rem 0;
`;

export function HeadingMarkdownRender(children: { level: number; children: string }) {
	let Head;
	switch (children.level) {
		case 1:
			Head = <h1 css={{ fontSize: '2.5rem' }}>{children.children}</h1>;
			break;
		case 2:
			Head = <h2 css={{ fontSize: '2rem' }}>{children.children}</h2>;
			break;
		case 3:
			Head = <h3 css={{ fontSize: '1.5rem' }}>{children.children}</h3>;
			break;
		case 4:
			Head = <h4 css={{ fontSize: '1.3125rem' }}>{children.children}</h4>;
			break;
		case 5:
			Head = <h5 css={{ fontSize: '1.3125rem' }}>{children.children}</h5>;
			break;
		case 6:
			Head = <h6 css={{ fontSize: '1.3125rem' }}>{children.children}</h6>;
			break;

		default:
			break;
	}

	return (
		<>
			<HeadingStyled>{Head}</HeadingStyled>
		</>
	);
}

const ParagraphTagStyled = styled.p`
	margin: 1.2rem 0;
`;

export function ParagraphMarkdownRender(children: { children: React.ReactNode }) {
	return <ParagraphTagStyled>{children.children}</ParagraphTagStyled>;
}

const HorizontalRuleTagStyled = styled.hr`
	margin: 2rem 0;
	border-top: 0.1px solid ${(props) => props.theme.gray_2};
`;

export function HorizontalRuleMarkdownRender(children: { children: React.ReactNode }) {
	return <HorizontalRuleTagStyled>{children.children}</HorizontalRuleTagStyled>;
}

const StrongTagStyled = styled.strong`
	font-family: 'Spoqa Han Sans Medium';
	color: ${(props) => props.theme.neon_2};
	font-weight: 400;
`;

export function StrongMarkdownRender(children: { children: React.ReactNode }) {
	return <StrongTagStyled>{children.children}</StrongTagStyled>;
}

const LinkTagStyled = styled.a`
	border: none;
	outline: none;
	color: ${(props) => props.theme.neon_2};
	font-family: 'Spoqa Han Sans Thin';
	text-decoration: none;
`;

export function LinkMarkdownRender(children: { href: string; children: string }) {
	return <LinkTagStyled href={children.href}>{children.children}</LinkTagStyled>;
}

const TableWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 2rem 0;
	height: auto;
`;

const TableStyled = styled.table`
	display: table;
	width: 100%;
	color: ${(props) => props.theme.black};
	border: 1px solid ${(props) => props.theme.gray_1};
`;

export function TableMarkdownRender(children: { children: React.ReactNode }) {
	return (
		<TableWrap>
			<TableStyled>{children.children}</TableStyled>
		</TableWrap>
	);
}

const TheadStyled = styled.thead`
	border-bottom: 2px solid ${(props) => props.theme.neon_2};
	vertical-align: center;

	& > * tr,
	th {
		padding: 0.5rem 2rem;
		line-height: 1.7rem;
		font-family: 'Spoqa Han Sans Thin';
		font-size: 0.9rem;
	}
`;

export function TheadMarkdownRender(children: { children: React.ReactNode }) {
	return <TheadStyled>{children.children}</TheadStyled>;
}

const TbodyStyled = styled.tbody`
	vertical-align: center;
	& > * tr,
	td {
		padding: 0.5rem 1rem;
		border: 1px solid ${(props) => props.theme.gray_1};
		font-family: 'Spoqa Han Sans Thin';
		font-size: 0.9rem;
	}
`;

export function TbodyMarkdownRender(children: { children: React.ReactNode }) {
	return <TbodyStyled>{children.children}</TbodyStyled>;
}
