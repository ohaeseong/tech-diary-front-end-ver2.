import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useEffect, useState, useCallback, ChangeEvent, useRef } from 'react';
import Switch from 'react-switch';
import { RiMoonClearFill } from 'react-icons/ri';
import { FaSun } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Image from 'next/image';

import { AiOutlineSearch } from 'react-icons/ai';
import { color } from 'styles/color';
import { getStorage } from 'libs/storage';
import NavBarItem from 'components/base/NavBar/NavBarItem';
import MenuSlider from 'components/common/MenuSlider';
import MenuItem from 'components/common/MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import useMenuSliderHeight from 'libs/hooks/useMenuSliderHeight';
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from 'store/modules';
import { useSelector } from 'react-redux';
import { mediaQuery } from 'components/layout/responsive';
import useToggle from 'libs/hooks/useToggle';
import ButtonGroup from 'components/common/ButtonGroup';
import LabelInput from 'components/common/LabelInput';
import ModalBox from 'components/common/ModalBox';
import Button from 'components/common/Button';
import { reqeustSignUpEmailSend } from 'libs/repository';
import useRequest from 'libs/hooks/useRequest';
import isEmail from 'libs/regEx';
import useHeader from 'libs/hooks/useHeader';
import { server } from 'config/config';

const NavBarWrap = styled.div<{ isDown: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: column;
	${(props) =>
		props.isDown &&
		`
		position: absolute;
		top: -100px;
    `}
`;

const NavBarContent = styled.div<{ isScroll: boolean; isMain?: boolean }>`
	position: fixed;
	width: 100%;
	height: 4rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
		z-index: 100;
        background-color: ${props.theme.white};
        box-shadow: 0 2px 6px 0 ${color.shadow};
	`}

	${(props) =>
		props.isMain === false &&
		`
		z-index: 100;
        background-color: ${props.theme.white};
		box-shadow: 0 2px 6px 0 ${color.shadow};
    `}

	${mediaQuery(768)} {
		z-index: 100;
		background-color: ${(props) => props.theme.white};
		box-shadow: 0 2px 6px 0 ${color.shadow};
	}
`;

const AccountButtonWrap = styled.div`
	display: flex;
	flex-direction: row;
	margin-right: 1rem;

	${mediaQuery(768)} {
		margin-right: 1rem;
	}
`;

const SwitchWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5rem;
	height: 100%;
	margin-right: 2.5rem;
	${mediaQuery(768)} {
		display: none;
	}
`;

const IconWrap = styled.div`
	display: flex;
	width: 100%;
	height: 100%;

	align-items: center;
	justify-content: center;
`;

const ProfileWrap = styled.div`
	position: relative;
	width: 2rem;
	height: 2rem;
	margin: 0 2rem;
	${mediaQuery(768)} {
		margin: auto 1rem auto auto;
	}

	& > img {
		border-radius: 50%;
	}
`;

const GoToWritePageIconWrap = styled.div<{ isScroll: boolean; isMain?: boolean }>`
	margin-left: 1rem;
	width: 2rem;
	height: 2rem;

	& > * {
		cursor: pointer;
		color: ${color.gray_0};
	}

	${(props) =>
		props.isScroll &&
		`
		& > * {
			color: ${props.theme.gray_4};	
		}
	`}

	${(props) =>
		props.isMain === false &&
		`
			& > * {
				color: ${props.theme.gray_4};	
			}
	`}


	${mediaQuery(768)} {
		& > * {
			color: ${(props) => props.theme.gray_4};
			width: 1.1rem;
		}
	}
`;

const Logo = styled.span<{ isScroll: boolean; isMain?: boolean }>`
	display: block;
	color: ${color.gray_0};
	margin-left: 10rem;
	font-size: 1.3rem;
	cursor: pointer;
	transition: 0.3s ease-in-out;

	${(props) =>
		props.isScroll &&
		`
        color: ${props.theme.black};
	`}

	${(props) =>
		props.isMain === false &&
		`
        color: ${props.theme.black};
	`}

	${mediaQuery(768)} {
		margin-left: 2rem;
		font-size: 1.125rem;
		color: ${(props) => props.theme.black};
	}
`;

const SearchIconWrap = styled.div<{ isMain?: boolean; isScroll: boolean }>`
	width: 2rem;
	height: 2rem;

	margin: auto 1rem auto auto;

	& > * {
		cursor: pointer;
		color: ${color.gray_0};
	}

	${(props) =>
		props.isScroll &&
		`
		& > * {
			color: ${props.theme.gray_4};	
		}
	`}

	${(props) =>
		props.isMain === false &&
		`
			& > * {
				color: ${props.theme.gray_4};	
			}
	`}


	${mediaQuery(768)} {
		& > * {
			color: ${(props) => props.theme.gray_4};
			width: 1.1rem;
		}

		margin: auto 0rem auto 9rem;
	}
`;

const LinkWrap = styled.div``;

type Props = {
	isDark: boolean;
	handleIsDarkState: any;
	isMain?: boolean;
};

function NavBar({ isDark, handleIsDarkState, isMain }: Props) {
	const [isScroll, setIsScroll] = useState(false);
	const [isToken, setIsToken] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [userProfileImage, setUserProfileImage] = useState(`${server.client_url}/static/user.png`);
	const [memberId, setMemberId] = useState('');
	const [menuHeight, menuToggle, closeMenu] = useMenuSliderHeight(150);
	const [modalIsOpenValue, modalOpenToggle] = useToggle(false);
	const [, , onRequestSendEmail] = useRequest(reqeustSignUpEmailSend, true);
	const [email, setEmail] = useState('');
	const [modalMsg, setModalMsg] = useState({
		isError: false,
		message: '',
	});
	const [userInfo, onLogout] = useHeader();
	const { profileImage } = useSelector((state: RootState) => state.auth);

	const router = useRouter();

	const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);
	const prevScrollTop = useRef(0);
	const handleIsScrollEvent = useCallback(() => {
		const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

		if (nextDirection === 'UP') {
			setIsDown(false);
		} else if (nextDirection === 'DOWN' && !isMain) {
			setIsDown(true);
		}

		prevScrollTop.current = scrollTop;

		if (isMain && window.scrollY > 100) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	}, [isMain]);

	const goToProfile = useCallback(() => {
		const userPageUrl = `${userInfo.memberId}`;

		router.push(`/${userPageUrl}`);
	}, [router, userInfo]);

	const closeModalBox = useCallback(() => {
		setModalMsg({
			isError: false,
			message: '',
		});
		setEmail('');
		modalOpenToggle();
	}, [modalOpenToggle]);

	const onSendEmail = useCallback(async () => {
		if (!email) {
			setModalMsg({
				isError: true,
				message: '이메일을 작성해 주세요.',
			});

			return;
		}

		if (!isEmail(email)) {
			setModalMsg({
				isError: true,
				message: '이메일 형식이 아니에요.',
			});

			return;
		}

		const req = {
			email,
		};

		const response = await onRequestSendEmail(req);

		if (response.status === 403) {
			setModalMsg({
				isError: true,
				message: '이미 가입된 이메일 입니다.',
			});

			return;
		}

		closeModalBox();
		toast.success('메일함을 확인해 주세요!', {
			position: toast.POSITION.TOP_RIGHT,
		});
	}, [closeModalBox, email, onRequestSendEmail]);

	useEffect(() => {
		window.addEventListener('scroll', handleIsScrollEvent);

		return () => {
			window.removeEventListener('scroll', handleIsScrollEvent);
		};
	}, [handleIsScrollEvent]);

	useEffect(() => {
		const token = getStorage('tech-token') as string;
		if (token && userInfo) {
			setIsToken(true);
			if (userInfo.profileImage) {
				setUserProfileImage(userInfo.profileImage);
			}

			setMemberId(userInfo.memberId);
		} else {
			setIsToken(false);
		}
	}, [isToken, router, userInfo]);

	useEffect(() => {
		if (profileImage) {
			setUserProfileImage(profileImage);
		}
	}, [profileImage]);

	useEffect(() => {
		document.body.addEventListener('click', closeMenu);

		return () => document.body.removeEventListener('click', closeMenu);
	}, [closeMenu]);

	return (
		<NavBarWrap isDown={isDown}>
			{modalIsOpenValue ? (
				<ModalBox msg={modalMsg}>
					<LabelInput
						label="이메일 인증"
						margin="1rem 0 2rem 0"
						value={email}
						onChange={handleEmail}
						size="regular"
						justifyContent="center"
					/>
					<ButtonGroup
						sortDirection="row"
						margin="1rem 0rem 0rem 0rem"
						childrenMargin="0rem 0rem 0rem 2rem"
						width="100%"
					>
						<Button size="sm" onClick={closeModalBox} margin="0rem 2rem 0 0">
							취소
						</Button>
						<Button size="sm" btnColor={color.neon_2} onClick={onSendEmail} margin="0rem 0rem 0 2rem">
							메일 보내기
						</Button>
					</ButtonGroup>
				</ModalBox>
			) : (
				<></>
			)}
			<NavBarContent isScroll={isScroll} isMain={isMain}>
				<Link href="/">
					<Logo isScroll={isScroll} isMain={isMain}>
						work-it
					</Logo>
				</Link>
				<Link href="/search">
					<SearchIconWrap isScroll={isScroll} isMain={isMain}>
						<AiOutlineSearch size="1.8rem" />
					</SearchIconWrap>
				</Link>
				{isToken ? (
					<Link href="/write">
						<GoToWritePageIconWrap isScroll={isScroll} isMain={isMain}>
							<HiOutlinePencilAlt size="1.8rem" />
						</GoToWritePageIconWrap>
					</Link>
				) : (
					<></>
				)}
				{isToken ? (
					<ProfileWrap>
						<Image
							src={userProfileImage}
							onClick={menuToggle}
							alt="profile_image"
							width={60}
							height={60}
							objectFit="cover"
							className="profileImage"
						/>
						<style>{`
							.profileImage {
								border-radius: 50%;
								cursor: pointer;
							}
						`}</style>
						<MenuSlider height={menuHeight}>
							<MenuItem onClick={goToProfile}>내 정보</MenuItem>
							<MenuItem onClick={() => router.push('/write')}>글 쓰러 가기</MenuItem>
							<MenuItem onClick={() => router.push(`/${memberId}/save`)}>임시글 보러가기</MenuItem>
							<MenuItem onClick={() => router.push(`/${memberId}/bookmark`)}>북마크한 글 보러가기</MenuItem>
							<MenuItem onClick={onLogout}>로그아웃</MenuItem>
						</MenuSlider>
					</ProfileWrap>
				) : (
					<AccountButtonWrap>
						<NavBarItem url="/login" isScroll={isScroll} isMain={isMain}>
							로그인
						</NavBarItem>
						<LinkWrap onClick={modalOpenToggle}>
							<NavBarItem url="" isScroll={isScroll} isMain={isMain}>
								회원가입
							</NavBarItem>
						</LinkWrap>
					</AccountButtonWrap>
				)}
				<SwitchWrap>
					<Switch
						checked={isDark}
						onChange={() => handleIsDarkState()}
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
			</NavBarContent>
			<ToastContainer autoClose={1500} />
		</NavBarWrap>
	);
}

export default NavBar;
