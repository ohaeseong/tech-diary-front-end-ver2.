import React from 'react';
import styled from '@emotion/styled';

const Pre = styled.pre`
	background-color: ${(props) => props.theme.info};
	padding: 2rem;
	color: ${(props) => props.theme.gray_5};
	line-height: 1.5rem;
	margin: 2rem auto;
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
