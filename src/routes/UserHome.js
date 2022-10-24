import Background from '../components/Background';
import Header from '../components/Header';
import Gallery from '../components/BucketlistGallary';
import History from '../components/History';
import Footer from '../components/Footer';
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useLayoutEffect, useState, useRef } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosConfig';
import { useEffect } from 'react';
import lottie from 'lottie-web';
import RM from '../assets/right_middle.png';
import LB from '../assets/left_bottom.png';

const MainWrapper = styled.div`
	width: 580px;
	height: calc(100vh - 50px);
	max-height: 1000px;
	min-height: 900px;
	background-color: #fafafa;
	margin: 0 auto;
	filter: drop-shadow(4px 16px 10px rgba(0, 0, 0, 0.25));
	position: relative;
	top: -130px;
	border-radius: 0 0 24px 24px;
`;

const InnerContainer = styled.div`
	width: 100%;
	height: calc(100% - 100px);
	min-height: 800px;
	max-height: 900px;
	min-width: 580px;
	background-color: #fafafa;
`;

const DisplayedContainer = styled.div`
	position: absolute;
	transform: translate(0, 0) rotate(${(props) => props.angle});
	left: ${(props) => props.left};
	top: ${(props) => props.top};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
`;

const DisplayedImg = styled.img``;

const DisplayedDiv = styled.div`
	position: absolute;
	width: 200px;
	height: 200px;
	left: ${(props) => props.left};
	top: ${(props) => props.top};
`;

const ToPersonalBtn = styled.button`
	width: calc(100% - 60px);
	margin: 0 30px;
`;

const GalleryWrapper = styled.div`
	width: 100%;
	margin-top: 220px;
	background-color: #fafafa;
	filter: drop-shadow(4px 12px 10px rgba(0, 0, 0, 0.35));
`;

const GalleryContainer = styled.div`
	width: 1120px;
	height: 680px;
	margin: 0 auto;
`;

const GalleryTitle = styled.div`
	padding-top: 58px;
	height: 178px;
	font-size: 1.5rem;
	font-weight: 500;
	& > div {
		width: 150px;
		border-bottom: 4px solid #32a797;
		margin-bottom: 10px;
	}
	span {
		color: #32a797;
	}
`;

const GalleryInner = styled.div`
	height: 444px;
`;

const HistoryWrapper = styled.div`
	margin-top: 400px;
`;

const HistoryContainer = styled.div`
	box-sizing: border-box;
	width: 1200px;
	margin: 0 auto;
	background-color: #fafafa;
	filter: drop-shadow(4px 12px 10px rgba(0, 0, 0, 0.35));
	border-radius: 20px;
	padding: 58px 40px;
`;

const HistoryTitle = styled.div`
	height: 100px;
	font-size: 1.5rem;
	font-weight: 500;
	& > div {
		width: 150px;
		border-bottom: 4px solid #32a797;
		margin-bottom: 10px;
	}
	span {
		color: #32a797;
	}
`;

const LottieWrapper = styled.div`
	position: absolute;
	top: 100px;
	left: -150px;
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

function UserHome() {
	const [isUser, setIsUser] = useState('');
	const [username, setUsername] = useState('');
	const [displayed, setDisplayed] = useState([]);
	const displayedRef = useRef([]);
	const likeDivIndex1 = useRef();
	const likeDivIndex2 = useRef();

	const auth = async () => {
		try {
			const req = await axiosInstance.get(
				`${process.env.REACT_APP_BASE_URL}/authtoken`
			);
			setIsUser((p) => (p = req.data.id));
			setUsername((p) => (p = req.data.name));
		} catch (error) {
			console.log('auth' + error);
		}
	};

	const loadDisplayed = async () => {
		try {
			const req = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/loaddisplayed`,
				{
					userid: isUser,
				}
			);
			setDisplayed((p) => (p = req.data));
		} catch (error) {
			console.log(error);
		}
	};

	useLayoutEffect(() => {
		auth();
	}, []);

	useLayoutEffect(() => {
		loadDisplayed();
	}, [isUser]);

	useEffect(() => {
		console.log(displayed);
		if (displayed.length > 0) {
			const ani = (el, json) =>
				lottie.loadAnimation({
					container: el, // Required
					renderer: 'svg', // Required
					loop: true, // Optional
					autoplay: true, // Optional
					animationData: require(`../json/${json}.json`),
					rendererSettings: {
						filterSize: {
							width: '200%',
							height: '200%',
							x: '-50%',
							y: '-50%',
						},
					},
				});

			displayed.map((arr, index) =>
				ani(displayedRef.current[index], `${arr.filename}`)
			);
		}
	}, [displayed]);

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
			<LottieWrapper ref={likeDivIndex2}></LottieWrapper>
			<Background height={3000} />
			<Header />
			<MainWrapper>
				<InnerContainer>
					<div
						style={{
							position: 'absolute',
							top: '500px',
							left: '',
							width: '230px',
							height: '230px',
							padding: '0',
							margin: '0',
						}}
					></div>
					<div
						style={{
							position: 'relative',
							top: '500px',
							left: '230px',
							padding: '0',
							margin: '0',
						}}
					>
						<img
							src={`${process.env.REACT_APP_BASE_URL}/images/branch.svg`}
							alt=''
						/>
					</div>
					{displayed.map((arr, index) => (
						<DisplayedContainer
							key={arr.id}
							left={`${arr.posx}px`}
							top={`${arr.posy}px`}
							angle={`${arr.angle}deg`}
							width={`${arr.basicwidth}px`}
							height={`${arr.basicheight}px`}
							draggable={false}
						>
							{/* <DisplayedImg
								src={`${process.env.REACT_APP_BASE_URL}/images/${arr.filename}.svg`}
								alt=''
								draggable={false}
							/> */}
							<DisplayedDiv
								left={`${arr.basicleft}px`}
								top={`${arr.basictop}px`}
								ref={(el) => (displayedRef.current[index] = el)}
							></DisplayedDiv>
						</DisplayedContainer>
					))}
				</InnerContainer>
				<NavLink to='/personal'>
					<ToPersonalBtn>나의 버킷플라워 보러 가기</ToPersonalBtn>
				</NavLink>
			</MainWrapper>
			<GalleryWrapper>
				<GalleryContainer>
					<GalleryTitle>
						<div></div>
						<span>{username}</span>님의 버킷리스트 갤러리
					</GalleryTitle>
					<GalleryInner>
						<Gallery />
					</GalleryInner>
				</GalleryContainer>
			</GalleryWrapper>
			<HistoryWrapper>
				<HistoryContainer>
					<HistoryTitle>
						<div></div>
						<span>{username}</span>님의 히스토리
					</HistoryTitle>
					<History userid={isUser} />
				</HistoryContainer>
			</HistoryWrapper>
			<Footer margin={350}></Footer>
			<RightMiddle src={RM} alt=''></RightMiddle>
			<LeftBottom src={LB} alt=''></LeftBottom>
		</div>
	);
}

export default UserHome;
