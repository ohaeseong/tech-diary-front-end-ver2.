import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { css } from '@emotion/react';

const ToastTemplate = styled.div<{ isCall: boolean }>`
	position: fixed;
	top: 7rem;
	right: 5rem;

	${(props) => {
		if (props.isCall) {
			return css`
				& > * {
					transition: ease-in-out 0.2s;
					word-break: break-all;
					width: 20rem;
					height: 4rem;
					padding: 1rem;
				}
			`;
		}
		return css`
			& > * {
				transition: ease-in-out 0.2s;
				width: 0;
				height: 0;
				padding: 0;
			}
		`;
	}}
`;

const ToastWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	color: white;

	background-color: #39ff14;
`;

function Toast() {
	const { isCall, text } = useSelector((store: RootState) => store.toast);

	return (
		<>
			<ToastTemplate isCall={isCall}>
				<ToastWrap>{text}</ToastWrap>
			</ToastTemplate>
		</>
	);
}

export default React.memo(Toast);
