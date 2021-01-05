import React from 'react';
import styled from '@emotion/styled';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { color } from 'styles/color';

const SkeletonWrap = styled.div`
	width: 270px;
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
	background-color: ${color.gray_2};
	border-radius: 5px;

	& > * {
		margin-bottom: 0.5rem;
	}
`;

const SkeletonTemplate = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
	grid-template-rows: repeat(auto-fit, 5);
	column-gap: 2rem;
	row-gap: 2rem;
`;

function SkeletonLoading() {
	return (
		<SkeletonTheme color={color.gray_0} highlightColor={color.gray_1}>
			<SkeletonTemplate>
				<SkeletonWrap>
					<Skeleton width={250} height={70} />
					<Skeleton width={200} height={30} />
					<Skeleton width={220} height={70} />
					<Skeleton width={250} height={30} />
				</SkeletonWrap>
			</SkeletonTemplate>
		</SkeletonTheme>
	);
}

export default SkeletonLoading;
