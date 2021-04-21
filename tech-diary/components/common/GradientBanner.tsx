import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { media } from 'components/layout/responsive';

const Banner = styled.div`
	width: 100%;
	height: 35rem;
	text-align: center;
	line-height: 20rem;
	${(props) => {
		return css`
			${props.theme.gradation}
		`;
	}}

	${media.sm} {
		display: none;
	}
`;

function GradientBanner() {
	return <Banner />;
}

export default GradientBanner;
