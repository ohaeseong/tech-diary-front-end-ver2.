import React from 'react';
import styled from '@emotion/styled';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import { BsTypeBold } from 'react-icons/bs';
import { BsTypeH1 } from 'react-icons/bs';

const ToolBoxWrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 4rem;
	background-color: white;
	box-shadow: 0 2px 6px 0 ${(props) => props.theme.gray_0};
`;

const ToolItemWrap = styled.div`
	/* border: 1px solid black; */
	display: flex;
	align-items: center;
`;

const ToolItem = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	margin-left: 1rem;
	font-family: 'Spoqa Han Sans Regular';
	font-weight: 700;
	border: none;
	cursor: pointer;
`;

function PostEditorTool() {
	return (
		<ToolBoxWrap>
			<ToolItemWrap>
				<ToolItem>
					<BsTypeH1 size="1rem" />
				</ToolItem>
				<ToolItem>H2</ToolItem>
				<ToolItem>H3</ToolItem>
				<ToolItem>H4</ToolItem>
				<ToolItem>
					<BsTypeBold size="1.7rem" />
				</ToolItem>
				<ToolItem>H4</ToolItem>
				<ToolItem>H4</ToolItem>
			</ToolItemWrap>
			<Button size="sm" color={color.neon_2}>
				작성 완료
			</Button>
		</ToolBoxWrap>
	);
}

export default PostEditorTool;
