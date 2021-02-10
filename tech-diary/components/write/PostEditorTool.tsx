import React from 'react';
import styled from '@emotion/styled';
import Button from 'components/common/Button';
import { color } from 'styles/color';

const ToolBoxWrap = styled.div`
	display: flex;
	flex-direction: row;
	position: absolute;
	width: 100%;
	height: 4rem;
	background-color: white;
	box-shadow: 0 2px 6px 0 ${(props) => props.theme.gray_0};
`;

function PostEditorTool() {
	return (
		<ToolBoxWrap>
			<Button size="sm" color={color.neon_2}>작성 완료</Button>
		</ToolBoxWrap>
	);
}

export default PostEditorTool;
