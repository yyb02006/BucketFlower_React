import axios from 'axios';
import axiosInstance from '../utils/axiosConfig';
import styled, { css, keyframes } from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';

const slideNext = (page) => keyframes`
	0%{
		right: calc(1120px * ${page - 1});
	}
	100%{
		right: calc(1120px * ${page});
	}
`;

const slidePrev = (page) => keyframes`
	0%{
		right: calc(1120px * ${page + 1});
	}
	100%{
		right: calc(1120px * ${page});
	}
`;

const ImagesContainer = styled.div`
	position: relative;
`;

const Carousel = styled.div`
	position: relative;
	width: 100%;
	overflow: hidden;
`;

const ImagesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 368px;
	width: 160px;
	position: relative;
	${(props) =>
		props.slide === 'next'
			? css`
					animation: ${slideNext(props.page)} 0.4s linear forwards;
			  `
			: props.slide === 'prev'
			? css`
					animation: ${slidePrev(props.page)} 0.4s linear forwards;
			  `
			: null}
`;

const Images = styled.div`
	width: 180px;
	height: 180px;
	border-radius: 8px;
	margin-right: 8px;
	object-fit: cover;
	img {
		width: inherit;
		height: inherit;
		border-radius: inherit;
	}
	&:not(:nth-child(2n)) {
		margin-bottom: 8px;
	}
`;

const Button = styled.div`
	position: absolute;
	top: calc(50% - 30px);
	left: -30px;
	display: flex;
	justify-content: space-between;
	width: calc(100% + 60px);
`;

const PrevBtn = styled.button`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	filter: drop-shadow(0 8px 8px rgba(0, 0, 0, 0.25));
	background-color: #fafafa;
	position: relative;
	top: 0;
`;

const NextBtn = styled.button`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	filter: drop-shadow(0 8px 8px rgba(0, 0, 0, 0.25));
	background-color: #fafafa;
	position: relative;
	top: 0;
`;

function Gallery() {
	const [isUser, setIsUser] = useState('');
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(0);
	const [slide, setSlide] = useState('init');
	const [imageChunks, setImageChunks] = useState([]);

	const auth = async () => {
		try {
			const req = await axiosInstance.get('http://localhost:8080/authtoken');
			setIsUser((p) => (p = req.data.id));
		} catch (error) {
			console.log('auth' + error);
		}
	};

	const loadGallary = async () => {
		try {
			const req = await axios.post('http://localhost:8080/gallary', {
				userid: isUser,
			});
			setImages((p) => (p = req.data));
		} catch (error) {
			console.log(error);
		}
	};

	const ImageChunk = async () => {
		const items = [...images];
		const arr = [];

		while (items.length) {
			arr.push(items.splice(0, 12));
		}

		setImageChunks((p) => (p = [...arr]));

		console.log(arr, items);
	};

	const prev = () => {
		if (page > 0) {
			setPage((p) => --p);
			setSlide((p) => (p = 'prev'));
		}
	};

	const next = () => {
		if (page + 1 < images.length / 12) {
			setPage((p) => ++p);
			setSlide((p) => (p = 'next'));
		}
	};

	useLayoutEffect(() => {
		auth();
	}, []);

	useEffect(() => {
		if (!isUser === false) {
			loadGallary();
		}
	}, [isUser]);

	useEffect(() => {
		if (images.length > 0) {
			ImageChunk();
		}
	}, [images]);

	useEffect(() => {
		console.log(page, slide);
	}, [page]);

	return (
		<ImagesContainer>
			<Carousel>
				<ImagesWrapper page={page} slide={slide}>
					{imageChunks.length > 0
						? images
								.filter((image) => image.Author === isUser)
								.map((image) => (
									<Images key={image.id}>
										<img
											src={`http://localhost:8080/${isUser}/${image.Title}/${image.FileName}`}
											alt=''
										/>
									</Images>
								))
						: null}
				</ImagesWrapper>
			</Carousel>
			{images.length > 12 ? (
				<Button>
					<PrevBtn onClick={prev} />
					<NextBtn onClick={next} />
				</Button>
			) : null}
		</ImagesContainer>
	);
}

export default Gallery;
