import React from 'react';
import styled from '@emotion/styled';

const NotFoundPageTemplate = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	border: 1px solid black;
`;

function Custom404() {
	return <NotFoundPageTemplate>404 - Page Not Found</NotFoundPageTemplate>;
}

export default Custom404;
