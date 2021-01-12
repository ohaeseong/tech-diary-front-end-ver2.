import React from 'react';
import styled from '@emotion/styled';

const Pre = styled.pre`
	background-color: ${(props) => props.theme.info};
	padding: 2rem;
	color: ${(props) => props.theme.black};
	line-height: 1.5rem;
	margin: 2rem auto;

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
	background-color: ${(props) => props.theme.info};
`;

export function BlockQuote(children: { children: React.ReactNode }) {
	return <BlockQuoteStyle>{children.children}</BlockQuoteStyle>;
}

const InlinCode = styled.span`
	background: ${(props) => props.theme.emphasis};
`;

export function InlineCodeBlock(children: { value: React.ReactNode }) {
	return <InlinCode>{children.value}</InlinCode>;
}

const StrongStyle = styled.strong`
	font-weight: 700;
`;

export function Strong(children: { children: React.ReactNode }) {
	return <StrongStyle>{children.children}</StrongStyle>;
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

	margin: 3rem auto;

	object-fit: contain;
`;

export function ImageMarkdownRender(children: { value: React.ReactNode }) {
	return (
		<ImageWrap>
			<ImageStyle src={children.src} alt="post_image"/>
		</ImageWrap>
	);
}

const ListStyle = styled.li`
		color: ${(props) => props.theme.black};
`;

export function ListMarkdownRander(children: { children: React.ReactNode }) {
	return <ListStyle>{children.children}</ListStyle>;
}

const UlStyle = styled.ul`
	padding-left: 2rem;
	list-style-type: disc;
	color: ${(props) => props.theme.black};
`;

export function UlMarkdownRander(children: { children: React.ReactNode }) {
	return <UlStyle>{children.children}</UlStyle>;
}

const OlStyle = styled.ol`
	list-style-type: decimal;
	padding-left: 2rem;
	margin: 1rem auto;
	color: ${(props) => props.theme.black};
`;

export function OlMarkdownRander(children: { children: React.ReactNode }) {
	return <OlStyle>{children.children}</OlStyle>;
}