import styled from '@emotion/styled';
// import Image from 'next/image';
import React from 'react';

import { color } from 'styles/color';

const LoadingWrap = styled.div<{ width: string; height: string }>`
	width: ${(props) => props.width && `${props.width}`};
	height: ${(props) => props.height && `${props.height}`};
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: ${color.white};

	& > img {
		width: 100px;
		height: 100px;
	}
`;

type Props = {
	width?: string;
	height?: string;
};

function Loading({ width = '100%', height = '100vh' }: Props) {
	return (
		<LoadingWrap width={width} height={height}>
			<img src="/static/loading_gif.gif" alt="loading.gif" />
		</LoadingWrap>
	);
}

export default Loading;
