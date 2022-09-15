import { isVisible } from '@testing-library/user-event/dist/utils';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import cancelIcon from '../assets/cancel_icon.svg';

const slideUp = keyframes`
	0%{
		margin-top: 20px;
    opacity: 0%;
	}
	100%{
		margin-top: 0;
    opacity: 100%;
	}`;

const slideDown = keyframes`
	0%{
  margin-top: 0;
  opacity: 100%;
	}
	100%{
		margin-top: 20px;
    opacity: 0;
	}`;

const swipe = (current, previous) => keyframes`
	0%{
		right: ${previous};
	}
	100%{
		right: ${current};
	}
`;

const ModalContainer = styled.div`
	box-sizing: border-box;
	width: 780px;
	background-color: #fafafa;
	height: calc(100vh - 96px);
	min-height: 400px;
	position: fixed;
	top: 48px;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 16px;
	padding-top: 24px;
	filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
	animation-name: ${slideUp};
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;

	${(props) =>
		props.onAnimation &&
		css`
			animation-name: ${slideDown};
		`}
`;

const Title = styled.div`
	font-size: 1.25rem;
	font-weight: 400;
	display: flex;
	justify-content: center;
	color: #32a797;
`;

const MenuContainer = styled.div`
	display: flex;
	width: 100%;
	height: 52px;
	margin-top: 36px;
	border-bottom: 4px solid #bcbcbc;
	font-size: 1.25rem;
	font-weight: 400;
	button {
		border-radius: 0;
		padding: 0;
		font-size: inherit;
		font-weight: inherit;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const TrunkTap = styled.button`
	background-color: transparent;
	color: ${(props) => (props.current === 'Trunks' ? '#32a797' : '#bcbcbc')};
`;

const FlowerTap = styled.button`
	background-color: transparent;
	color: ${(props) => (props.current === 'Flowers' ? '#32a797' : '#bcbcbc')};
`;

const LeafeTap = styled.button`
	background-color: transparent;
	color: ${(props) => (props.current === 'Leafes' ? '#32a797' : '#bcbcbc')};
`;

const IndicateBar = styled.div`
	position: relative;
	top: -4px;
	border-bottom: 4px solid #32a797;
	width: 260px;
	${(props) =>
		css`
			animation-name: ${swipe(props.current, props.previous)};
		`};
	animation-duration: 0.2s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;
`;

const Trunks = styled.div``;

const Flowers = styled.div``;

const Leafes = styled.div``;

const Close = styled.button`
	border-radius: 0;
	padding: 0;
	margin-top: 16px;
	margin-right: 20px;
	font-size: inherit;
	font-weight: inherit;
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	color: #404040;
	background-color: transparent;
	img {
		margin-right: 4px;
	}
`;

function SelectFlowerModal({ onModal, onCancel }) {
	const [visible, setVisible] = useState(false);
	const [animation, setAnimation] = useState(onModal);
	const [tapMenu, setTapMenu] = useState('Trunks');
	const [swipeBar, setSwipeBar] = useState('0px');
	const [prevSwipeBar, setPrevSwipeBar] = useState('0px');
	const [swipe, setSwipe] = useState();

	useEffect(() => {
		if (visible && !onModal) {
			setAnimation(true);
			setTimeout(() => {
				setAnimation((p) => (p = false));
				setTapMenu((p) => (p = 'Trunks'));
				setSwipeBar((p) => (p = '0px'));
				setPrevSwipeBar((p) => (p = '0px'));
			}, 300);
		}
		setVisible((p) => (p = onModal));
	}, [visible, onModal]);

	useEffect(() => {
		if (setPrevSwipeBar !== swipeBar) {
			setTimeout(() => {
				setPrevSwipeBar((p) => (p = swipeBar));
			}, 200);
		}
	}, [swipeBar]);

	const onTrunks = () => {
		setTapMenu((p) => (p = 'Trunks'));
		setSwipeBar((p) => (p = '0px'));
	};

	const onFlowers = () => {
		setTapMenu((p) => (p = 'Flowers'));
		setSwipeBar((p) => (p = '-260px'));
	};

	const onLeafes = () => {
		setTapMenu((p) => (p = 'Leafes'));
		setSwipeBar((p) => (p = '-520px'));
	};

	if (!visible && !animation) return null;
	return (
		<>
			<ModalContainer onAnimation={animation}>
				<Close onClick={onCancel}>
					<img src={cancelIcon} alt='' /> 닫기
				</Close>
				<Title>가지고싶은 보상을 골라주세요!</Title>
				<MenuContainer>
					<TrunkTap onClick={onTrunks} current={tapMenu}>
						가지
					</TrunkTap>
					<FlowerTap onClick={onFlowers} current={tapMenu}>
						꽃
					</FlowerTap>
					<LeafeTap onClick={onLeafes} current={tapMenu}>
						잎사귀
					</LeafeTap>
				</MenuContainer>
				<IndicateBar current={swipeBar} previous={prevSwipeBar}></IndicateBar>
				<Trunks></Trunks>
				<Flowers></Flowers>
				<Leafes></Leafes>
			</ModalContainer>
		</>
	);
}

export default SelectFlowerModal;
