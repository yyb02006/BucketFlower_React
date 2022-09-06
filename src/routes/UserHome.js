import Background from '../components/Background';
import Header from '../components/Header';
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
	background-color: bisque;
`;

const HistoryWrapper = styled.div`
	margin-top: 400px;
`;

const HistoryContainer = styled.div`
	width: 1180px;
	height: 600px;
	margin: 0 auto;
	background-color: #fafafa;
	filter: drop-shadow(4px 12px 10px rgba(0, 0, 0, 0.35));
	border-radius: 20px;
`;

const HistoryTitle = styled.div``;

function UserHome() {
	return (
		<div>
			<Background />
			<Header />
			<MainWrapper>
				<InnerContainer></InnerContainer>
				<NavLink to='/personal'>
					<ToPersonalBtn>나의 버킷플라워 보러 가기</ToPersonalBtn>
				</NavLink>
			</MainWrapper>
			<GalleryWrapper>
				<GalleryContainer>
					<GalleryTitle>
						<div></div>홍길동님의 버킷리스트 갤러리
					</GalleryTitle>
					<GalleryInner></GalleryInner>
				</GalleryContainer>
			</GalleryWrapper>
			<HistoryWrapper>
				<HistoryContainer>
					<HistoryTitle>홍길동님의 히스토리</HistoryTitle>
				</HistoryContainer>
			</HistoryWrapper>
		</div>
	);
}

export default UserHome;
