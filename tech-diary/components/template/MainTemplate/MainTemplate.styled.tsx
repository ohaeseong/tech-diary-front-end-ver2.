import styled from '@emotion/styled';
import { color } from 'styles/color';

export const Template = styled.div`
	position: relavive;
`;

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const MainContents = styled.div`
	width: 100%;
	min-height: 10rem;
	display: flex;
	flex-direction: column;
	align-content: center;
	background-color: ${color.gray_0};
`;
