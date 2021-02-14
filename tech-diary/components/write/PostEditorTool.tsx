import React from 'react';
import styled from '@emotion/styled';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import Switch from 'react-switch';
import { BsTypeBold } from 'react-icons/bs';
import { RiMoonClearFill } from 'react-icons/ri';
import { FaSun } from 'react-icons/fa';
import { BiItalic, BiLinkAlt, BiSave } from 'react-icons/bi';
import { HiCode } from 'react-icons/hi';
import { MdFormatStrikethrough, MdImage, MdFormatQuote } from 'react-icons/md';

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
	margin: 0 0.5rem;
	font-family: 'Spoqa Han Sans Regular';
	font-weight: 700;
	background-color: white;
	font-size: 1rem;
	color: ${(props) => props.theme.gray_5};
	border: none;
	outline: none;
	cursor: pointer;
`;

const IconWrap = styled.div`
	display: flex;
	width: 100%;
	height: 100%;

	align-items: center;
	justify-content: center;
`;

const SwitchWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5rem;
	height: 100%;
	margin-right: 2.5rem;
`;

type Props = {
	isDark: boolean;
	toggleTheme: () => void;
}

function PostEditorTool({ toggleTheme, isDark }: Props) {
	const ICON_SIZE = '1.5rem';

	return (
		<ToolBoxWrap>
			<ToolItemWrap>
				<ToolItemGroup>
					<ToolItem>
						<BiSave size={ICON_SIZE} />
					</ToolItem>
					<ToolItem>H1</ToolItem>
					<ToolItem>H2</ToolItem>
					<ToolItem>H3</ToolItem>
					<ToolItem>H4</ToolItem>
				</ToolItemGroup>
				<ToolItemGroup>
					<ToolItem>
						<BsTypeBold size={ICON_SIZE} />
					</ToolItem>
					<ToolItem>
						<BiItalic size={ICON_SIZE} />
					</ToolItem>
					<ToolItem>
						<MdFormatStrikethrough size={ICON_SIZE} />
					</ToolItem>
				</ToolItemGroup>
				<ToolItemGroup>
					<ToolItem>
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
				<SwitchWrap>
					<Switch
						checked={isDark}
						onChange={() => toggleTheme()}
						checkedIcon={
							<IconWrap>
								<FaSun color="#F5B7B1" />
							</IconWrap>
						}
						uncheckedIcon={
							<IconWrap>
								<RiMoonClearFill color="#F4D03F" />
							</IconWrap>
						}
						onColor={color.neon_0}
						offColor={color.black}
					/>
				</SwitchWrap>
				<Button color={color.neon_2} margin="0 2rem 0 0">
					작성 완료
				</Button>
			</ToolItemWrap>
		</ToolBoxWrap>
	);
}

export default PostEditorTool;
