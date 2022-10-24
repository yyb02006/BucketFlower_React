import Header from '../components/Header';
import Background from '../components/Background';
import Footer from '../components/Footer';
import styled, { keyframes, css } from 'styled-components';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import lottie from 'lottie-web';
import RM from '../assets/right_middle.png';
import LB from '../assets/left_bottom.png';

const MoveBox = keyframes`
	0%{
		transform: translateY(50px);
		opacity: 30%;
	}
	100%{
		transform: translateY(0%);
		opacity: 100%;
	}
`;

const MoveCardD = (distance) =>
	keyframes`
	0%{
		transform: translateY(${distance}px);
	}
	100%{
		transform: translateY(0%);
		opacity: 100%;
	}
`;

const RiseUp = keyframes`
0%{
		transform: translateY(80px);
		opacity: 0%;
	}
	100%{
		transform: translateY(0%);
		opacity: 100%;
	}
`;

const IntroCardStyle = (value, sec) => css`
	animation: ${MoveCardD(value)} ${sec} forwards;
	width: 360px;
	aspect-ratio: 360/550;
	margin: 0 12px;
	background-color: #fafafa;
	border-radius: 12px;
	opacity: 30%;
	filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.35));
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const Main = styled.div`
	position: relative;
	max-width: 1200px;
	min-height: 600px;
	margin: 0 auto;
	display: flex;
	padding-top: 100px;
	animation: ${MoveBox} 1.2s;
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
	/* background-color: rgba(20, 30, 40, 0.5); */
`;

const MainVideo = styled.div`
	width: 880px;
	min-width: 500px;
	height: ${(props) => (props.width * 600) / 880}px;
	background-color: #fafafa;
	border-radius: 20px;
	filter: drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.35));
`;

const MainText = styled.div`
	max-width: 304px;
	min-width: 280px;
	margin-left: 16px;
	font-size: 3rem;
	font-family: 'S-CoreDream';
	font-weight: 700;
	letter-spacing: -0.25rem;
	& > span {
		color: #239e8e;
	}
`;

const IntroWrapper = styled.div`
	position: relative;
	max-width: 1200px;
	margin: 0 auto;
	padding-top: 400px;
	display: flex;
	justify-content: space-around;
	& > div:nth-child(1) {
		${(props) => props.move && IntroCardStyle(150, '0.8s')};
	}
	& > div:nth-child(2) {
		${(props) => props.move && IntroCardStyle(200, '1.2s')};
	}
	& > div:nth-child(3) {
		${(props) => props.move && IntroCardStyle(250, '1.6s')};
	}
`;

const IntroCard = styled.div`
	& > div:nth-child(1) {
		height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	& > div:nth-child(1) > div {
		width: 200px;
		height: 100px;
		background-color: #f05a1f;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
	}
	& > div:nth-child(2) {
		border-top: 2px solid #909090;
		margin: 0 24px;
	}
	& > p {
		font-size: 2rem;
		font-weight: 400;
		margin: 20px 24px;
	}
	span {
		color: #32a797;
		font-weight: 500;
	}
`;

const PreviewWrapper = styled.div`
	max-width: 1200px;
	height: 900px;
	padding-top: 400px;
	margin: 0 auto;
`;

const PreviewContainer = styled.div`
	height: 500px;
	display: flex;
	flex-wrap: wrap;
	& > div:not(:nth-child(4n)) {
		margin-right: 20px;
	}
	div {
		margin-bottom: 20px;
	}
`;

const PreviewInner = styled.div`
	width: 280px;
	height: 280px;
	background-color: #fafafa;
	border-radius: 20px;
	filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.35));
	display: flex;
	justify-content: center;
	align-items: center;
	${(props) =>
		props.move
			? css`
					visibility: visible;
					animation: ${RiseUp} 1s forwards;
					animation-delay: calc(${props.delay} * 0.1s);
					animation-fill-mode: backwards;
			  `
			: css`
					visibility: hidden;
			  `}
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const PreviewText = styled.div`
	margin: 0 auto;
	width: 1200px;
	display: flex;
	justify-content: center;
	font-size: 1.625rem;
	font-weight: 400;
	line-height: 2.75rem;
	padding-top: 24px;
	${(props) =>
		props.move
			? css`
					animation: ${RiseUp} 1s forwards;
					animation-delay: 1.3s;
					animation-fill-mode: backwards;
			  `
			: null}
	p {
		margin: 0;
	}
	span {
		color: #32a797;
	}
`;

const LottieWrapper = styled.div`
	position: absolute;
	top: 100px;
`;

const RightMiddle = styled.img`
	position: absolute;
	top: 1300px;
	right: -220px;
`;

const LeftBottom = styled.img`
	position: absolute;
	top: 2030px;
	left: -90px;
`;

function Home() {
	const [offsetY, setOffsetY] = useState('');
	const [cardMove, setCardMove] = useState(false);
	const [width, setWidth] = useState('');
	const [innerWidth, setInnerWidth] = useState('');
	const [isLogin, setIsLogin] = useState('');
	const [previews, setPreviews] = useState([]);
	const [previewsMove, setPreviewsMove] = useState(false);
	const VideoRef = useRef();
	const likeDivIndex1 = useRef();
	const likeDivIndex2 = useRef();
	const move = useNavigate();

	const auth = async () => {
		try {
			const req = await axiosInstance.get(
				`${process.env.REACT_APP_BASE_URL}/authtoken`
			);
			setIsLogin((p) => (p = req.data.id));
			console.log('First' + req.data.id);
		} catch (error) {
			console.log('auth' + error);
		}
	};

	const loadPreviews = async () => {
		try {
			const req = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/loadRewards`
			);

			let newarr = [];

			while (newarr.length < 12 && req.data.length > 0) {
				let modarr = req.data.splice(
					Math.floor(Math.random() * req.data.length),
					1
				)[0];
				newarr.push(modarr);
			}
			setPreviews((p) => (p = newarr));
		} catch (error) {
			console.log(error);
		}
	};

	const handleScroll = () => {
		setOffsetY((p) => (p = window.scrollY));
	};
	const handleResize = () => {
		setInnerWidth((p) => (p = window.innerWidth));
	};

	useEffect(() => {
		setWidth((p) => (p = VideoRef.current.offsetWidth));
	}, [innerWidth]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (offsetY >= 400) {
			setCardMove((p) => (p = true));
		}
	}, [offsetY]);

	useEffect(() => {
		if (offsetY >= 1300) {
			setPreviewsMove((p) => (p = true));
		}
	}, [offsetY]);

	useLayoutEffect(() => {
		auth();
		loadPreviews();
		if (isLogin) {
			move('userhome');
		}
	}, []);

	useEffect(() => {
		console.log(previewsMove);
	}, [previewsMove]);

	useEffect(() => {
		const ani = (el, json) =>
			lottie.loadAnimation({
				container: el, // Required
				renderer: 'svg', // Required
				loop: true, // Optional
				autoplay: true, // Optional
				animationData: require(`../json/${json}`),
				rendererSettings: {
					filterSize: {
						width: '200%',
						height: '200%',
						x: '-50%',
						y: '-50%',
					},
				},
			});

		ani(likeDivIndex1.current, 'left_top_index_0.json');
		ani(likeDivIndex2.current, 'left_top_index_1.json');
	}, []);

	return (
		<div>
			<LottieWrapper ref={likeDivIndex1}></LottieWrapper>
			<Background height={3500} />
			<Header />
			<Main>
				<MainVideo ref={VideoRef} width={width}></MainVideo>
				<MainText>
					여러분의
					<br /> <span>버킷리스트</span>를 시작해보세요
				</MainText>
			</Main>
			<IntroWrapper offsetY={offsetY} move={cardMove}>
				<IntroCard>
					<div>
						<div>MOTION IMAGE 1</div>
					</div>
					<div></div>
					<p>
						나만의
						<br />
						<span>버킷리스트</span>
						를<br />
						작성하고,
					</p>
				</IntroCard>
				<IntroCard>
					<div>
						<div>MOTION IMAGE 2</div>
					</div>
					<div></div>
					<p>
						이루고싶은
						<br />내 꿈들에
						<br />
						<span>도전</span>하고,
					</p>
				</IntroCard>
				<IntroCard>
					<div>
						<div>MOTION IMAGE 3</div>
					</div>
					<div></div>
					<p>
						내 꿈을
						<br />
						이룰수록
						<br />
						<span>꽃</span>이자라고!
					</p>
				</IntroCard>
			</IntroWrapper>
			<PreviewWrapper>
				<PreviewContainer>
					{previews.map((preview, index) => (
						<PreviewInner key={preview.id} move={previewsMove} delay={index}>
							<img
								src={`${process.env.REACT_APP_BASE_URL}/images/${preview.filename}.svg`}
								alt=''
							/>
						</PreviewInner>
					))}
				</PreviewContainer>
			</PreviewWrapper>
			<PreviewText move={previewsMove}>
				<p>
					<span>버킷플라워</span>는 여러분이 버킷리스트를 이루어 가는 과정을
					통해 자라납니다.
					<br />
					평소에 하고싶었던 것을 하나씩 달성하며 나만의 버킷플라워를 키워보세요!
				</p>
			</PreviewText>
			<Footer margin={350}></Footer>
			<LottieWrapper ref={likeDivIndex2}></LottieWrapper>
			<RightMiddle src={RM} alt=''></RightMiddle>
			<LeftBottom src={LB} alt=''></LeftBottom>
		</div>
	);
}

export default Home;
