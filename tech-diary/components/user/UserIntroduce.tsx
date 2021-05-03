import React from 'react';
import styled from '@emotion/styled';
import MarkdwonRenderer from 'components/common/MarkdownRenderer';
import { color } from 'styles/color';
import { FiEdit } from 'react-icons/fi';
import MarkdownEditor from 'components/write/MarkdownEditor';
import Button from 'components/common/Button';

const UserIntroduceWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 46rem;
	min-height: 30rem;
	border-radius: 7px;
	border: 1px solid ${color.gray_1};
	margin-top: 0.5rem;
	padding: 0rem 2rem 1rem;
`;

const Head = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 2rem;
	padding-right: 0.5rem;
	margin-top: 3rem;

	& > * {
		margin-right: 0.5rem;
		cursor: pointer;
	}
`;

const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 1rem;
	margin-bottom: 6rem;
	height: 4rem;

	& > * {
		margin-top: 2rem;
	}
`;

const IntroTextLength = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.gray_3};
	margin-right: 1rem;
	font-size: 1.08rem;

	font-family: 'Spoqa Han Sans Thin';
`;

type Props = {
	introText: string;
	isReadOnly: boolean;
	isMine: boolean;
	handleUserIntroText: (value: string) => void;
	isReadOnlyToggle: () => void;
	onSaveUserInfo: () => void;
};

function UserIntroduce({
	introText,
	isReadOnly,
	isMine,
	handleUserIntroText,
	isReadOnlyToggle,
	onSaveUserInfo,
}: Props) {
	return (
		<>
			<Head>
				{isReadOnly && isMine ? <FiEdit size="1.5rem" color={color.gray_4} onClick={isReadOnlyToggle} /> : <></>}
			</Head>
			<UserIntroduceWrap>
				{isReadOnly ? (
					<MarkdwonRenderer markdown={introText} type="introduce" />
				) : (
					<MarkdownEditor
						markdownText={introText}
						option={{
							mode: 'markdown',
							lineNumbers: false,
							placeholder: '소개글 작성...',
							lineWrapping: true,
							tabSize: 8,
							autofocus: true,
						}}
						onChangeMarkdownText={handleUserIntroText}
						minHeight="30rem"
					/>
				)}
			</UserIntroduceWrap>
			<Bottom>
				{isReadOnly ? (
					<></>
				) : (
					<>
						<IntroTextLength>{`${introText.length}/1000`}</IntroTextLength>
						<Button width="5rem" height="2.5rem" btnColor={color.neon_2} onClick={onSaveUserInfo}>
							저장
						</Button>
					</>
				)}
			</Bottom>
		</>
	);
}

export default UserIntroduce;
