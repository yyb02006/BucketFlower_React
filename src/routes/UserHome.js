import Background from '../components/Background';
import Header from '../components/Header';
import Gallery from '../components/BucketlistGallary';
import History from '../components/History';
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosConfig';
import { useEffect } from 'react';

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
	background-color: #fafafa;
`;

const DisplayedContainer = styled.div`
	position: absolute;
	transform: translate(0, 0) rotate(${(props) => props.angle});
	left: ${(props) => props.left};
	top: ${(props) => props.top};
`;

const DisplayedImg = styled.img``;

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
`;

function UserHome() {
	const [isUser, setIsUser] = useState('');
	const [displayed, setDisplayed] = useState([]);

	const auth = async () => {
		try {
			const req = await axiosInstance.get('http://localhost:8080/authtoken');
			setIsUser((p) => (p = req.data.id));
		} catch (error) {
			console.log('auth' + error);
		}
	};

	const loadDisplayed = async () => {
		try {
			const req = await axios.post('http://localhost:8080/loaddisplayed', {
				userid: isUser,
			});
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
	}, [displayed]);

	return (
		<div>
			<Background />
			<Header />
			<MainWrapper>
				<InnerContainer>
					{displayed.map((arr, index) => (
						<DisplayedContainer
							key={arr.id}
							left={`${arr.posx}px`}
							top={`${arr.posy}px`}
							angle={`${arr.angle}deg`}
							draggable={false}
						>
							<DisplayedImg
								src={`http://localhost:8080/images/${arr.filename}.svg`}
								alt=''
								draggable={false}
							/>
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
						<div></div>홍길동님의 버킷리스트 갤러리
					</GalleryTitle>
					<GalleryInner>
						<Gallery />
					</GalleryInner>
				</GalleryContainer>
			</GalleryWrapper>
			<HistoryWrapper>
				<HistoryContainer>
					<HistoryTitle>
						<div></div>홍길동님의 히스토리
					</HistoryTitle>
					<History userid={isUser} />
				</HistoryContainer>
			</HistoryWrapper>
		</div>
	);
}

export default UserHome;
