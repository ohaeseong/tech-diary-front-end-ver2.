import React from 'react';
import styled from '@emotion/styled';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import { BsTypeBold } from 'react-icons/bs';
import { BiItalic, BiLinkAlt } from 'react-icons/bi';
import { HiCode } from 'react-icons/hi';
import { MdFormatStrikethrough, MdImage, MdFormatQuote } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

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
	display: flex;
	align-items: center;
`;

const ToolItemGroup = styled.div`
	display: flex;
	align-items: center;
	margin-left: 2rem;
`;

const ToolItem = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	margin: 0 0.4rem;
	font-family: 'Spoqa Han Sans Regular';
	font-weight: 700;
	background-color: white;
	font-size: 1rem;
	color: ${(props) => props.theme.gray_5};
	border: none;
	outline: none;
	cursor: pointer;
`;

type Props = {
	onClick: (mode: string) => void;
	openModal: () => void;
	requestSave: () => void;
};

function PostEditorTool({ onClick, openModal, requestSave }: Props) {
	const ICON_SIZE = '1.5rem';
	return (
		<ToolBoxWrap>
			<ToolItemWrap>
				<ToolItemGroup>
					<ToolItem onClick={() => onClick('H1')}>H1</ToolItem>
					<ToolItem onClick={() => onClick('H2')}>H2</ToolItem>
					<ToolItem onClick={() => onClick('H3')}>H3</ToolItem>
					<ToolItem onClick={() => onClick('H4')}>H4</ToolItem>
				</ToolItemGroup>
				<ToolItemGroup>
					<ToolItem onClick={() => onClick('BOLD')}>
						<BsTypeBold size={ICON_SIZE} />
					</ToolItem>
					<ToolItem onClick={() => onClick('ITALIC')}>
						<BiItalic size={ICON_SIZE} />
					</ToolItem>
					<ToolItem onClick={() => onClick('DEL')}>
						<MdFormatStrikethrough size={ICON_SIZE} />
					</ToolItem>
				</ToolItemGroup>
				<ToolItemGroup>
					<ToolItem onClick={() => onClick('CODE')}>
						<HiCode size={ICON_SIZE} />
					</ToolItem>
					<ToolItem>
						<BiLinkAlt size={ICON_SIZE} />
					</ToolItem>
					<ToolItem>
						<MdImage size={ICON_SIZE} />
					</ToolItem>
					<ToolItem>
						<MdFormatQuote size={ICON_SIZE} />
					</ToolItem>
				</ToolItemGroup>
			</ToolItemWrap>
			<ToolItemWrap>
				<Button btnColor={color.gray_3} margin="0 1.2rem 0 0" onClick={requestSave}>
					임시 저장
				</Button>
				<Button btnColor={color.neon_2} margin="0 2rem 0 0" onClick={openModal}>
					작성 완료
				</Button>
				<ToastContainer autoClose={2500} toastStyle={{ backgroundColor: `${color.neon_2}` }} />
			</ToolItemWrap>
		</ToolBoxWrap>
	);
}

export default PostEditorTool;
