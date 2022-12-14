import axios from 'axios';
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
	min-height: 400px;
	position: fixed;
	top: 48px;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 16px;
	padding-top: 24px;
	overflow: hidden;
	filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
	animation-name: ${slideUp};
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;

	${(props) =>
		props.animation &&
		css`
			animation-name: ${slideDown};
		`}
`;

const Title = styled.div`
	font-size: 1.25rem;
	font-weight: 500;
	display: flex;
	justify-content: center;
	color: #32a797;
`;

const MenuContainer = styled.div`
	display: flex;
	width: 100%;
	height: 52px;
	margin-top: 48px;
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

const LeafTap = styled.button`
	background-color: transparent;
	color: ${(props) => (props.current === 'Leaves' ? '#32a797' : '#bcbcbc')};
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

const SubTitle = styled.div`
	font-weight: 500;
	font-size: 1.125rem;
	margin-bottom: 8px;
	margin-top: 16px;
`;

const Trunks = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 300px);
	min-height: 300px;
	padding: 0 24px;
	overflow: overlay;
	animation-name: ${slideUp};
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;
`;

const Flowers = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 300px);
	min-height: 300px;
	padding: 0 24px;
	overflow: overlay;
	animation-name: ${slideUp};
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;
`;

const Leaves = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: calc(100vh - 300px);
	min-height: 300px;
	padding: 0 24px;
	overflow: overlay;
	animation-name: ${slideUp};
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;
`;

const RewardsInner = styled.div`
	display: flex;
	flex-wrap: wrap;
	& > button:not(:nth-child(5n)) {
		margin-right: 8px;
	}
`;

const BranchesWrapper = styled.button`
	width: 140px;
	height: 200px;
	background-color: #e9e9e9;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	margin-bottom: 8px;
	&:hover {
		background-color: #65e8c4;
	}
`;

function SelectFlowerModal({ onModal, onCancel, userId, listId }) {
	const [visible, setVisible] = useState(false);
	const [animation, setAnimation] = useState(onModal);
	const [tapMenu, setTapMenu] = useState('Trunks');
	const [swipeBar, setSwipeBar] = useState('0px');
	const [prevSwipeBar, setPrevSwipeBar] = useState('0px');
	const [singles, setSingles] = useState([]);
	const [multiples, setMultiples] = useState([]);
	const [branchs, setBranchs] = useState([]);
	const [swipe, setSwipe] = useState();
	const themes = {
		branch: '??????',
		stem: '??????',
		red: '?????????',
		purple: '?????????',
		rounded: '?????????',
		pointed: '?????????',
	};

	const loadRewards = async () => {
		try {
			const req = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/loadRewards`
			);
			const single = req.data.filter((arr) => arr.category === 'single');
			const multiple = req.data.filter((arr) => arr.category === 'multiple');
			const branch = req.data.filter((arr) => arr.category === 'branch');
			setSingles((p) => (p = single));
			setMultiples((p) => (p = multiple));
			setBranchs((p) => (p = branch));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (onModal) {
			loadRewards();
		}
	}, [onModal]);

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

	const onLeaves = () => {
		setTapMenu((p) => (p = 'Leaves'));
		setSwipeBar((p) => (p = '-520px'));
	};

	const selectReward = async (
		file,
		category,
		theme,
		basicAngle,
		basicLeft,
		basicTop,
		basicWidth,
		basicHeight
	) => {
		try {
			const req = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/setreward`,
				{
					userid: userId,
					rewards: file,
					category: category,
					theme: theme,
					basicangle: basicAngle,
					listid: listId,
					basicleft: basicLeft,
					basictop: basicTop,
					basicwidth: basicWidth,
					basicheight: basicHeight,
				}
			);
			onCancel();
		} catch (error) {
			console.log(error);
		}
	};

	const rewardsList = (title, theme) => {
		return (
			<>
				<SubTitle>{title}</SubTitle>
				<RewardsInner>
					{singles
						.filter((arr) => arr.theme === { theme })
						.map((arr) => (
							<BranchesWrapper
								key={arr.id}
								onClick={() =>
									selectReward(
										arr.filename,
										arr.category,
										arr.theme,
										arr.basicangle
									)
								}
							>
								<img
									src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.png`}
									alt=''
								/>
							</BranchesWrapper>
						))}
				</RewardsInner>
			</>
		);
	};

	if (!visible && !animation) return null;
	return (
		<>
			<ModalContainer animation={animation}>
				<Close onClick={onCancel}>
					<img src={cancelIcon} alt='' /> ??????
				</Close>
				<Title>????????? ?????????????????? ???????????????!</Title>
				<MenuContainer>
					<TrunkTap onClick={onTrunks} current={tapMenu}>
						Single
					</TrunkTap>
					<FlowerTap onClick={onFlowers} current={tapMenu}>
						Multiple
					</FlowerTap>
					<LeafTap onClick={onLeaves} current={tapMenu}>
						Trunk
					</LeafTap>
				</MenuContainer>
				<IndicateBar current={swipeBar} previous={prevSwipeBar}></IndicateBar>
				{tapMenu === 'Trunks' ? (
					<Trunks>
						<SubTitle>???????????????</SubTitle>
						<RewardsInner>
							{singles
								.filter((arr) => arr.theme === 'vivid')
								.map((arr) => (
									<BranchesWrapper
										key={arr.id}
										onClick={() =>
											selectReward(
												arr.filename,
												arr.category,
												arr.theme,
												arr.basicangle,
												arr.basicleft,
												arr.basictop,
												arr.basicwidth,
												arr.basicheight
											)
										}
									>
										<img
											src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.png`}
											alt=''
										/>
									</BranchesWrapper>
								))}
						</RewardsInner>
						{/* <SubTitle>??????</SubTitle>
						<RewardsInner>
							{singles
								.filter((arr) => arr.theme === 'vivid')
								.map((arr) => (
									<BranchesWrapper
										key={arr.id}
										onClick={() =>
											selectReward(
												arr.filename,
												arr.category,
												arr.theme,
												arr.basicangle,
												arr.basicleft,
												arr.basictop,
												arr.basicwidth,
												arr.basicheight
											)
										}
									>
										<img
											src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.png`}
											alt=''
										/>
									</BranchesWrapper>
								))}
						</RewardsInner> */}
					</Trunks>
				) : tapMenu === 'Flowers' ? (
					<Flowers>
						<SubTitle>???????????????</SubTitle>
						<RewardsInner>
							{multiples
								.filter((arr) => arr.theme === 'vivid')
								.map((arr) => (
									<BranchesWrapper
										key={arr.id}
										onClick={() =>
											selectReward(
												arr.filename,
												arr.category,
												arr.theme,
												arr.basicangle,
												arr.basicleft,
												arr.basictop,
												arr.basicwidth,
												arr.basicheight
											)
										}
									>
										<img
											src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.png`}
											alt=''
										/>
									</BranchesWrapper>
								))}
						</RewardsInner>
						{/* <SubTitle>?????????</SubTitle>
						<RewardsInner>
							{multiples
								.filter((arr) => arr.theme === 'vivid')
								.map((arr) => (
									<BranchesWrapper
										key={arr.id}
										onClick={() =>
											selectReward(
												arr.filename,
												arr.category,
												arr.theme,
												arr.basicangle,
												arr.basicleft,
												arr.basictop,
												arr.basicwidth,
												arr.basicheight
											)
										}
									>
										<img
											src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.png`}
											alt=''
										/>
									</BranchesWrapper>
								))}
						</RewardsInner> */}
					</Flowers>
				) : tapMenu === 'Leaves' ? (
					<Leaves>
						{/* <SubTitle>???????????????</SubTitle>
						<RewardsInner>
							{branchs
								.filter((arr) => arr.theme === 'vivid')
								.map((arr) => (
									<BranchesWrapper
										key={arr.id}
										onClick={() =>
											selectReward(
												arr.filename,
												arr.category,
												arr.theme,
												arr.basicangle,
												arr.basicleft,
												arr.basictop,
												arr.basicwidth,
												arr.basicheight
											)
										}
									>
										<img
											src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.png`}
											alt=''
										/>
									</BranchesWrapper>
								))}
						</RewardsInner>
						<SubTitle>????????? ???</SubTitle>
						<RewardsInner>
							{branchs
								.filter((arr) => arr.theme === 'vivid')
								.map((arr) => (
									<BranchesWrapper
										key={arr.id}
										onClick={() =>
											selectReward(
												arr.filename,
												arr.category,
												arr.theme,
												arr.basicangle,
												arr.basicleft,
												arr.basictop,
												arr.basicwidth,
												arr.basicheight
											)
										}
									>
										<img
											src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.png`}
											alt=''
										/>
									</BranchesWrapper>
								))}
						</RewardsInner> */}
					</Leaves>
				) : null}
			</ModalContainer>
		</>
	);
}

export default SelectFlowerModal;
