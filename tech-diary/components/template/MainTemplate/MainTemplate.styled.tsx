import styled from '@emotion/styled';
import { color, ThemeType } from 'styles/color';

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
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-content: center;
	background-color: ${(props) => props.theme.gray_0};
`;
