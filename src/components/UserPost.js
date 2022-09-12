import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import SeparateBar from './SeparateBar';
import openIcon from '../assets/open_icon.svg';
import closeIcon from '../assets/close_icon.svg';

const TitleBox = styled.div`
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
		background-color: #fafafa;
		color: #404040;
		font-size: 1rem;
		font-weight: 400;
		padding-left: 16px;
	}
`;

const ContentsBox = styled.div`
	font-size: 0.875rem;
	font-weight: 300;
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

const UserPost = function ({ index, list, userId, isOpen }) {
	const [post, setPost] = useState(false);
	const [loadImages, setLoadImages] = useState({});
	const showPost = () => {
		setPost((p) => (p = true));
	};
	const closePost = () => {
		setPost((p) => (p = false));
	};
	const loadImg = async () => {
		try {
			const req = await axios.post('http://localhost:8080/loadimage', {
				title: list.Title,
				userId: userId,
			});
			setLoadImages((p) => (p = req.data));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		loadImg();
	}, [isOpen]);
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
					<button>완료</button>
				</div>
			</TitleBox>
			{post ? (
				<ContentsBox>
					{list.Contents}
					<PhotoContainer>
						{loadImages.map((loadImage) => (
							<img
								src={`http://localhost:8080/${userId}/${list.Title}/${loadImage.FileName}`}
								alt=''
								key={loadImage.id}
							/>
						))}
					</PhotoContainer>
					{list.CreateDate.replace('15:00:00.000Z', '')
						.replace('-', '년 ')
						.replace('-', '월 ')
						.replace('T', '일 등록')}
				</ContentsBox>
			) : null}

			<SeparateBar margin={'8px'}></SeparateBar>
		</PostWrapper>
	);
};

export default UserPost;
