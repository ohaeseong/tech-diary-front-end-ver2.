import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { color } from 'styles/color';
import LabelInput from 'components/common/LabelInput';
import Button from 'components/common/Button';
import ButtonGroup from 'components/common/ButtonGroup';
import { fadein } from 'styles/animation';

const SignUpWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4rem 20rem 0 20rem;
	max-width: 100%;
	height: 100vh;
	background-color: ${(props) => props.theme.white_1};
`;

const Haed = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 5rem;
`;

const Title = styled.p`
	width: 100%;
	height: 3rem;
	line-height: 5rem;
	font-family: 'Spoqa Han Sans Bold';
	font-size: 2rem;
	color: ${color.neon_2};
	animation: ${fadein} 1s;
`;

const Description = styled.p`
	width: 100%;
	height: 100%;
	line-height: 5rem;
	font-size: 1rem;
	font-family: 'Spoqa Han Sans Thin';
	color: ${color.gray_4};
	animation: ${fadein} 1s;
`;

const Body = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 4rem;
	width: 100%;
	height: 30rem;

	& > * {
		animation: ${fadein} 1.5s;
	}
`;

const HalfOfBody = styled.div`
	width: 100%;
	height: 100%;
	margin-right: 1rem;
`;

const TemplateImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
	margin-left: 2rem;
`;

const Bottom = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 5rem;

	& > * {
		animation: ${fadein} 2s;
	}
`;

type Props = {
	cancleRegister: () => void;
	onSubmit: () => void;
	handleMemberName: (e: ChangeEvent<HTMLInputElement>) => void;
	handleMemberId: (e: ChangeEvent<HTMLInputElement>) => void;
	handleMemberPw?: (e: ChangeEvent<HTMLInputElement>) => void;
	handleIntroduce: (e: ChangeEvent<HTMLInputElement>) => void;
	memberId: string;
	memberPw?: string;
	memberName: string;
	introduce: string;
	errorMsg: string;
	isGithub?: boolean;
};

function SignUpTemplate({
	cancleRegister,
	errorMsg,
	onSubmit,
	memberId,
	memberName,
	introduce,
	isGithub,
	memberPw,
	handleIntroduce,
	handleMemberPw,
	handleMemberId,
	handleMemberName,
}: Props) {
	return (
		<SignUpWrap>
			<Haed>
				<Title>Tech Diary에 오신걸 환영합니다!</Title>
				<Description>기본 회원 정보를 등록해주세요.</Description>
			</Haed>
			<Body>
				<HalfOfBody>
					{isGithub ? (
						<>
							<LabelInput label="이름" margin="2rem 0 0 0" value={memberName} onChange={handleMemberName} />
							<LabelInput label="아이디" margin="2rem 0 0 0" value={memberId} onChange={handleMemberId} />
							<LabelInput label="한줄소개" margin="2rem 0 0 0" value={introduce} onChange={handleIntroduce} />
						</>
					) : (
						<>
							<LabelInput label="이름" margin="2rem 0 0 0" value={memberName} onChange={handleMemberName} />
							<LabelInput label="아이디" margin="2rem 0 0 0" value={memberId} onChange={handleMemberId} />
							<LabelInput label="비밀번호" margin="2rem 0 0 0" value={memberPw} onChange={handleMemberPw} />
							<LabelInput label="한줄소개" margin="2rem 0 0 0" value={introduce} onChange={handleIntroduce} />
						</>
					)}
				</HalfOfBody>
				<HalfOfBody>
					<TemplateImg src="/image/loginTemplateImage.png" alt="sign_up_template_image.png" />
				</HalfOfBody>
			</Body>
			{errorMsg}
			<Bottom>
				<ButtonGroup sortDirection="row" childrenMargin="0rem 2rem 0rem 0rem">
					<Button btnColor={color.gray_3} size="medium" onClick={cancleRegister}>
						취소
					</Button>
					<Button btnColor={color.neon_2} size="medium" onClick={onSubmit}>
						가입
					</Button>
				</ButtonGroup>
			</Bottom>
		</SignUpWrap>
	);
}

export default SignUpTemplate;
