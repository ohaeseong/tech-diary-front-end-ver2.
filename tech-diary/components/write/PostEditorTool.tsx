import React from 'react';
import styled from '@emotion/styled';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import { BsTypeBold } from 'react-icons/bs';
import { BiItalic, BiLinkAlt } from 'react-icons/bi';
import { HiCode } from 'react-icons/hi';
import { MdFormatStrikethrough, MdImage, MdFormatQuote } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import { mediaQuery } from 'components/layout/responsive';

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
	background-color: ${(props) => props.theme.white};
	box-shadow: 0 2px 6px 0 ${(props) => props.theme.gray_0};
`;

const ToolItemWrap = styled.div`
	display: flex;
	align-items: center;

	${mediaQuery(768)} {
		display: none;
	}
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
	background-color: ${(props) => props.theme.white};
	font-size: 1rem;
	color: ${(props) => props.theme.gray_5};
	border: none;
	outline: none;
	cursor: pointer;
`;

const UploadImageLabel = styled.label`
	width: 100%;
	height: 1.5rem;
	cursor: pointer;
`;

const ButtonWrapForMobile = styled.div`
	width: 100%;
	display: none;
	${mediaQuery(768)} {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
	}
`;

type Props = {
	onClick: (mode: string) => void;
	handleImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
	openModal: () => void;
	requestSave: () => void;
};

function PostEditorTool({ onClick, openModal, requestSave, handleImage }: Props) {
	const ICON_SIZE = '1.5rem';
	return (
		<>
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
						<ToolItem onClick={() => onClick('LINK')}>
							<BiLinkAlt size={ICON_SIZE} />
						</ToolItem>
						<ToolItem>
							<UploadImageLabel htmlFor="image_upload">
								<MdImage size={ICON_SIZE} />
							</UploadImageLabel>
							<input
								id="image_upload"
								type="file"
								style={{ display: 'none' }}
								multiple={false}
								accept="image/gif, image/jpeg, image/jpg, image/png"
								onChange={handleImage}
							/>
						</ToolItem>
						<ToolItem onClick={() => onClick('QUOTE')}>
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
				</ToolItemWrap>
				<ButtonWrapForMobile>
					<Button btnColor={color.gray_3} margin="0 1.2rem 0 0" onClick={requestSave}>
						임시 저장
					</Button>
				</ButtonWrapForMobile>
			</ToolBoxWrap>
			<ToastContainer autoClose={2500} />
		</>
	);
}

export default React.memo(PostEditorTool);
