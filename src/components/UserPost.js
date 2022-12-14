import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import SeparateBar from './SeparateBar';
import openIcon from '../assets/open_icon.svg';
import closeIcon from '../assets/close_icon.svg';
import checkIcon from '../assets/confirm.svg';
import ConfirmModal from './ConfirmModal';
import SelectFlowerModal from './SelectFlowerModal';

const slideDown = keyframes`
	0%{
		transform: translateY(20px);
		opacity: 50%;
	}
	100%{
		transform: translateY(0px);
		opacity: 100%;
	}
`;

const fadeIn = keyframes`
	0%{
		opacity: 0;
	}
	100%{
		opacity: 35%;
	}
`;

const fadeOut = keyframes`
	0%{
		opacity: 35%;
	}
	100%{
		opacity: 0;
	}
  `;

const TitleBox = styled.div`
	box-sizing: border-box;
	padding: 8px 0;
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
	& > div {
		display: inline-block;
	}
	& > div > div {
		display: inline-block;
		padding-left: 16px;
	}
	& > div > button {
		padding: 0;
		border-radius: 0;
		background-color: transparent;
		color: #808080;
		font-size: 1rem;
		font-weight: 400;
		padding-left: 16px;
	}
`;

const Completed = styled.div`
	padding: 0;
	border-radius: 0;
	background-color: transparent;
	color: #808080;
	font-size: 1rem;
	font-weight: 400;
	padding-left: 16px;
`;

const ContentsBox = styled.div`
	font-size: 0.875rem;
	font-weight: 300;
	animation: ${slideDown} 0.2s linear forwards;
`;

const PostWrapper = styled.div``;

const PhotoContainer = styled.div`
	& > img {
		width: 90px;
		height: 90px;
		border-radius: 8px;
		margin-right: 8px;
		margin-bottom: 4px;
		object-fit: cover;
	}
`;

const ModalBackground = styled.div`
	width: 100%;
	height: 100%;
	background-color: #000000;
	position: fixed;
	top: 0;
	left: 0;
	animation-name: ${fadeIn};
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;
	${(props) =>
		props.animation &&
		css`
			animation-name: ${fadeOut};
		`}
`;

const Checked = styled.img`
	position: absolute;
	margin-left: 8px;
	margin-top: 6px;
`;

const UserPost = function ({ index, list, userId, isOpen, select }) {
	const [post, setPost] = useState(false);
	const [loadImages, setLoadImages] = useState({});
	const [onCompleteModal, setOnCompleteModal] = useState(false);
	const [onSelectFlowerModal, setOnSelectFlowerModal] = useState(false);
	const [animation, setAnimation] = useState(false);
	const [visible, setVisible] = useState(onCompleteModal);

	const showPost = () => {
		setPost((p) => (p = true));
	};
	const closePost = () => {
		setPost((p) => (p = false));
	};
	const loadImg = async () => {
		try {
			const req = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/loadimage`,
				{
					title: list.Title,
					userId: userId,
				}
			);
			setLoadImages((p) => (p = req.data));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		loadImg();
	}, [isOpen]);

	useEffect(() => {
		if (visible && !onCompleteModal && !onSelectFlowerModal) {
			setAnimation((p) => (p = true));
			setTimeout(() => {
				setAnimation((p) => (p = false));
			}, 300);
		}
		if (!onSelectFlowerModal) {
			setVisible((p) => (p = onCompleteModal));
		} else if (onSelectFlowerModal) {
			setVisible((p) => (p = onSelectFlowerModal));
		}
	}, [visible, onCompleteModal, onSelectFlowerModal]);

	const onConfirm = () => {
		setOnCompleteModal((p) => (p = false));
		setOnSelectFlowerModal((p) => (p = true));
	};

	const onCancel = () => {
		setOnCompleteModal((p) => (p = false));
		setOnSelectFlowerModal((p) => (p = false));
		select();
	};

	const onComplete = () => {
		setOnCompleteModal((p) => (p = true));
	};

	return (
		<PostWrapper key={index}>
			<TitleBox>
				<div>
					{index + 1}. {list.Title}
				</div>
				<div>
					{post ? (
						<button onClick={closePost}>
							<img src={closeIcon} alt='' />
						</button>
					) : (
						<button onClick={showPost}>
							<img src={openIcon} alt='' />
						</button>
					)}
					{list.isCompleted === 0 ? (
						<button onClick={onComplete}>????????????</button>
					) : (
						<>
							<Completed>??????</Completed>
							<Checked src={checkIcon} alt='' />
						</>
					)}
				</div>
			</TitleBox>
			{post ? (
				<ContentsBox>
					{list.Contents}
					<PhotoContainer>
						{loadImages.map((loadImage) => (
							<img
								src={`${process.env.REACT_APP_BASE_URL}/${userId}/${list.Title}/${loadImage.FileName}`}
								alt=''
								key={loadImage.id}
							/>
						))}
					</PhotoContainer>
					{list.CreateDate.replace('15:00:00.000Z', '')
						.replace('-', '??? ')
						.replace('-', '??? ')
						.replace('T', '??? ??????')}
				</ContentsBox>
			) : null}
			<SeparateBar margin={'8px'}></SeparateBar>
			{!(!visible && !animation && !onSelectFlowerModal) ? (
				<ModalBackground
					onClick={onCancel}
					animation={animation}
				></ModalBackground>
			) : null}
			<ConfirmModal
				onModal={onCompleteModal}
				onContinue={onSelectFlowerModal}
				onConfirm={onConfirm}
				onCancel={onCancel}
				title='?????????????????? ???????????????????'
				titleBarWidth={'150px'}
				content='??? ??? ????????? ?????????????????? ????????? ??? ?????????\n?????? ?????????????????? ?????? ????????? ??????????????????.'
				confirmText='??????????????? ????????????'
			/>
			<SelectFlowerModal
				onModal={onSelectFlowerModal}
				onCancel={onCancel}
				userId={userId}
				listId={list.id}
			/>
		</PostWrapper>
	);
};

export default UserPost;
