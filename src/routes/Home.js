import Header from '../components/Header';
import Background from '../components/Background';
import styled, { keyframes, css } from 'styled-components';
import { useEffect, useState, useRef } from 'react';

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
	font-family: '6';
	letter-spacing: -1.5px;
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

function Home() {
	const [offsetY, setOffsetY] = useState('');
	const [cardMove, setCardMove] = useState(false);
	const [width, setWidth] = useState('');
	const [innerWidth, setInnerWidth] = useState('');

	const VideoRef = useRef();

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
		if (offsetY >= 600) {
			setCardMove((p) => (p = true));
		}
	}, [offsetY]);
	console.log(cardMove);
	return (
		<div>
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
		</div>
	);
}

export default Home;
