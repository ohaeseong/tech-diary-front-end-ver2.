import React from 'react';
import styled from '@emotion/styled';
import { color } from 'styles/color';

const Pre = styled.pre`
	background-color: ${(props) => props.theme.info};
	padding: 2rem;
	color: ${(props) => props.theme.black};
	line-height: 1.7rem;
	margin: 2rem auto;
	/* color: ${(props) => props.theme.gray_5}; */

	& > * {
		font-family: 'Spoqa Han Sans Thin';
		font-weight: 400;
		font-size: 1rem;
	}

	overflow: auto;
`;

export function CodeBlock(children: { value: React.ReactNode }) {
	return (
		<Pre>
			<code>{children.value}</code>
		</Pre>
	);
}

const BlockQuoteStyle = styled.div`
	border-left: 5px solid ${(props) => props.theme.neon_2};
	padding: 1rem;
	margin: 2rem auto;
	background-color: ${(props) => props.theme.info};
`;

export function BlockQuote(children: { children: React.ReactNode }) {
	return <BlockQuoteStyle>{children.children}</BlockQuoteStyle>;
}

const InlinCode = styled.em`
	background: ${(props) => props.theme.emphasis};
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
	height: auto;

	margin: 1rem auto;

	object-fit: contain;
`;

export function ImageMarkdownRender(children: { value: React.ReactNode }) {
	return (
		<ImageWrap>
			<ImageStyle src={children.src} alt="post_image" />
		</ImageWrap>
	);
}

const ListStyle = styled.li`
	color: ${(props) => props.theme.black};
`;

export function ListMarkdownRender(children: { children: React.ReactNode }) {
	return <ListStyle>{children.children}</ListStyle>;
}

const UlStyle = styled.ul`
	padding-left: 2rem;
	list-style-type: disc;
	color: ${(props) => props.theme.black};
`;

export function UlMarkdownRender(children: { children: React.ReactNode }) {
	return <UlStyle>{children.children}</UlStyle>;
}

const OlStyle = styled.ol`
	list-style-type: decimal;
	padding-left: 2rem;
	margin: 1rem auto;
	color: ${(props) => props.theme.black};
`;

export function OlMarkdownRender(children: { children: React.ReactNode }) {
	return <OlStyle>{children.children}</OlStyle>;
}

const HeadingStyled = styled.div`
	margin: 1rem 0;

	font-family: 'Spoqa Han Sans Regular';
`;

export function HeadingMarkdownRender(children: { children: React.ReactNode }) {
	let Head;
	switch (children.level) {
		case 1:
			Head = <h1>{children.children}</h1>;
			break;
		case 2:
			Head = <h2>{children.children}</h2>;
			break;
		case 3:
			Head = <h3>{children.children}</h3>;
			break;
		case 4:
			Head = <h4>children.children</h4>;
			break;
		case 5:
			Head = <h5>{children.children}</h5>;
			break;
		case 6:
			Head = <h6>{children.children}</h6>;
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
	return <HorizontalRuleTagStyled>{children.children}</HorizontalRuleTagStyled>
}

const StrongTagStyled = styled.strong`
	font-family: 'Spoqa Han Sans Medium';
	font-weight: 400;
`;

export function StrongMarkdownRender(children: { children: React.ReactNode }) {
	return <StrongTagStyled>{children.children}</StrongTagStyled>
}

const LinkTagStyled = styled.a`
	border: none;
	outline: none;
`;

export function LinkMarkdownRender(children: { children: any }) {
	console.log(children);
	
	return <LinkTagStyled href={children.href}>{children.children}</LinkTagStyled>
};