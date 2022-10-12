import Header from '../components/Header';
import Background from '../components/Background';
import styled, { keyframes, css } from 'styled-components';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import lottie from 'lottie-web';
import { ReactMediaRecorder } from 'react-media-recorder';

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

const IntroCard = styled.div``;

const LottieWrapper = styled.div`
	position: absolute;
	top: 100px;
`;

function Home() {
	const [offsetY, setOffsetY] = useState('');
	const [cardMove, setCardMove] = useState(false);
	const [width, setWidth] = useState('');
	const [innerWidth, setInnerWidth] = useState('');
	const [isLogin, setIsLogin] = useState('');
	const [testY, setTestY] = useState(0);
	const VideoRef = useRef();
	const move = useNavigate();

	const auth = async () => {
		try {
			const req = await axiosInstance.get('http://localhost:8080/authtoken');
			setIsLogin((p) => (p = req.data.id));
			console.log('First' + req.data.id);
		} catch (error) {
			console.log('auth' + error);
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

	useLayoutEffect(() => {
		auth();
		if (isLogin) {
			move('userhome');
		}
	}, []);
	// console.log(cardMove);

	const likeDivIndex1 = useRef();
	const likeDivIndex2 = useRef();

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
			<Background />
			<Header />
			<Main>
				<MainVideo ref={VideoRef} width={width}></MainVideo>
				<MainText>
					여러분의
					<br /> <span>버킷리스트</span>를 시작해보세요
				</MainText>
			</Main>
			<IntroWrapper offsetY={offsetY} move={cardMove}>
				<IntroCard />
				<IntroCard />
				<IntroCard>{offsetY}</IntroCard>
			</IntroWrapper>
			<LottieWrapper ref={likeDivIndex2}></LottieWrapper>
		</div>
	);
}

export default Home;
