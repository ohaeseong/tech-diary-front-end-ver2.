import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import HnadleClickOutSide from 'react-outside-click-handler';
import Button from 'components/common/Button';
import { color } from 'styles/color';

const LinkEditorWrap = styled.div<{ left?: string; top?: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 15rem;
	/* height: 5rem; */
	padding: 0.8rem 1.2rem;
	border: 1px solid ${(props) => props.theme.gray_1};
	border-radius: 3px;
	background-color: ${(props) => props.theme.white};
	box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);
`;

const LinkInput = styled.input`
	width: 100%;
	height: 100%;
	font-size: 0.8rem;
	border: 1px solid ${(props) => props.theme.gray_1};
	background-color: ${(props) => props.theme.gray_0};
	padding: 0.2rem;
	font-family: 'Spoqa Han Sans Thin';
	margin: 0.5rem 0;
`;

const ButtonWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

type Props = {
	linkText: string;
	linkUrl: string;

	handleLinkText: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLinkUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleLinkKeyEvent: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	addLink: () => void;
	onClose: () => void;
};

function LinkEditor({ handleLinkText, handleLinkUrl, handleLinkKeyEvent, addLink, onClose, linkText, linkUrl }: Props) {
	const input = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (!input.current) return;
		input.current.focus();
	}, []);
	return (
		<>
			<HnadleClickOutSide onOutsideClick={onClose}>
				<LinkEditorWrap>
					<LinkInput
						placeholder="링크 텍스트 (빈 값은 url로 표시 됩니다.)"
						value={linkText}
						onChange={handleLinkText}
					/>
					<LinkInput
						placeholder="링크 주소 입력"
						value={linkUrl}
						onChange={handleLinkUrl}
						onKeyPress={handleLinkKeyEvent}
						ref={input}
					/>
					<ButtonWrap>
						<Button fontSize="0.7rem" btnColor={color.neon_2} margin="0.5rem 0 0 0" height="1.5rem" onClick={addLink}>
							추가
						</Button>
					</ButtonWrap>
				</LinkEditorWrap>
			</HnadleClickOutSide>
		</>
	);
}

export default LinkEditor;
