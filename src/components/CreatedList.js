import SeparateBar from './SeparateBar';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../utils/axiosConfig';
import axios from 'axios';
import deleteIcon from '../assets/deleteImg_icon.svg';
import confirm from '../assets/confirm.svg';

const ListWrapper = styled.div`
	font-size: 1rem;
	font-weight: 400;
`;

const ListTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ModifyBtn = styled.button`
	color: #32a797;
	padding: 0;
	border-radius: 0;
	background-color: #fafafa;
	font-size: 1rem;
	font-weight: 400;
`;

const ImagePreviewWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 16px;
	& > button {
		display: block;
		width: 140px;
		height: 140px;
		border-radius: 8px;
		margin-right: 16px;
	}
`;

const ImagePreview = styled.div`
	position: relative;
	margin-right: 16px;
	margin-bottom: 12px;
	& > img {
		border-radius: 8px;
		width: 140px;
		height: 140px;
		object-fit: cover;
	}
`;

const ImgDelButton = styled.button`
	padding: 0;
	font-size: 0;
	position: absolute;
	right: -4px;
	top: -4px;
	filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.35));
`;

const CreateForm = styled.form`
	font-weight: 400;
	padding: 0;
	& > div {
		margin: 28px 0;
	}
	& > div > input {
		border-radius: 12px;
		margin-top: 16px;
		padding: 10px 20px;
		width: calc(100% - 40px);
	}
	& > div:nth-child(1) > span {
		font-weight: 400;
		font-size: 0.825rem;
		color: #ff4500;
	}
	& > div:nth-child(2) > textarea {
		line-height: 1.375rem;
		width: calc(100% - 40px);
		padding: 10px 20px;
		font-family: 'S-CoreDream';
		font-weight: 500;
		font-size: 0.825rem;
		border: none;
		border-radius: 12px;
		color: #404040;
		display: block;
		resize: none;
		margin-top: 16px;
		background-color: #e9e9e9;
	}
	& > div:nth-child(3) input {
		display: none;
		width: 140px;
		height: 140px;
		border-radius: 8px;
		margin-right: 16px;
	}
	& > div:nth-child(4) {
		margin-top: 36px;
		display: flex;
		justify-content: space-between;
	}
	& > div:nth-child(4) > button {
		font-size: 1rem;
		font-weight: 400;
		border-radius: 0;
		padding: 0;
		background-color: #fafafa;
		color: #404040;
	}
	& > div:nth-child(4) > button:nth-child(1) {
		color: #ff4500;
	}
	& > div:nth-child(4) > button > img {
		margin-right: 6px;
	}
`;

const PhotoContainer = styled.div`
	& > div {
		position: relative;
		margin-right: 16px;
		margin-bottom: 12px;
		display: inline-block;
	}
	& > div > img {
		width: 140px;
		height: 140px;
		border-radius: 8px;
		object-fit: cover;
	}

	& > div > form {
		padding: 0;
	}
	& > div input {
		display: none;
	}
`;

const ConfirmDeleteContainer = styled.div`
	font-size: 1.0625rem;
	width: 300px;
	background-color: #fafafa;
	position: fixed;
	top: 40%;
	left: 50%;
	margin-left: -150px;
	border-radius: 16px;
	filter: drop-shadow(0px 12px 10px rgba(0, 0, 0, 0.35));
	& > div {
		padding: 20px 20px 0 20px;
	}
	& > div:nth-child(2) {
		padding-bottom: 20px;
		margin-top: 24px;
		display: flex;
		justify-content: space-between;
	}
	& > div > span {
		color: #32a797;
	}
	& > div > button {
		display: inline-block;
		font-size: 1rem;
		font-weight: 400;
		padding: 0;
		background-color: #fafafa;
		color: #404040;
	}
	& > div > button:nth-child(2) {
		color: #ff4500;
	}
`;

function CreatedList({ index, list, userId, isOpen, setIsChange, fullList }) {
	const [modify, setModify] = useState(false);
	const [onTitleChange, setOnTitleChange] = useState(false);
	const [title, setTitle] = useState(list.Title);
	const [contents, setContents] = useState(list.Contents);
	const [images, setImages] = useState([]);
	const [loadedImages, setLoadedImages] = useState([]);
	const [loadedImagesId, setLoadedImagesId] = useState(0);
	const [loadImages, setLoadImages] = useState({});
	const [primalImages, setPrimalImages] = useState([]);
	const [deleteImages, setDeleteImages] = useState([]);
	const [isDelete, setIsDelete] = useState(false);
	const [overlapList, setOverlapList] = useState('');

	const selectImage = useRef();

	const loadImg = async () => {
		try {
			const req = await axios.post('http://localhost:8080/loadimage', {
				title: list.Title,
				userId: userId,
			});
			setLoadImages((p) => (p = req.data));
			setPrimalImages((p) => (p = req.data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadImg();
	}, [isOpen, modify]);

	useEffect(() => {
		setTitle((p) => (p = list.Title));
		setContents((p) => (p = list.Contents));
	}, [list]);

	useEffect(() => {
		const checkOverlap = fullList
			.filter((arr) => arr.Title !== list.Title)
			.filter((arr) => arr.Title === title);
		setOverlapList((p) => (p = checkOverlap));
	}, [title]);

	const onModify = () => {
		setModify((p) => (p = true));
		console.log(list);
	};
	const insertTitle = (e) => {
		setTitle((p) => (p = e.target.value));
		setOnTitleChange((p) => (p = true));
	};
	const insertContents = (e) => {
		setContents((p) => (p = e.target.value));
	};
	const insertImg = (e) => {
		const img = e.target.files[0];
		const fileReader = new FileReader();
		fileReader.readAsDataURL(img);
		fileReader.onload = () => {
			const preview = { key: loadedImagesId, image: fileReader.result };
			const serverImage = { key: loadedImagesId, image: img };
			setLoadedImagesId((p) => p + 1);
			setLoadedImages((p) => [...p, preview]);
			setImages((p) => [...p, serverImage]);
		};
	};
	const deleteImg = (index) => {
		const prvArr = loadedImages.filter((arr) => arr.key !== index);
		const serverArr = images.filter((arr) => arr.key !== index);
		setLoadedImages([...prvArr]);
		setImages([...serverArr]);
	};
	const cancelModify = () => {
		setModify((p) => (p = false));
		setOnTitleChange((p) => (p = false));
		setLoadedImagesId((p) => (p = 0));
		setLoadedImages((p) => (p = []));
		setImages((p) => (p = []));
		setDeleteImages((p) => (p = []));
		setLoadImages((p) => (p = primalImages));
	};
	const submitModify = async (e) => {
		e.preventDefault();
		if (title.length > 0 && overlapList.length === 0) {
			const modifiedData = new FormData();
			modifiedData.append('title', title);
			modifiedData.append('contents', contents);
			modifiedData.append('author', userId);
			modifiedData.append('prevTitle', list.Title);
			deleteImages.map((prev) => modifiedData.append('toDelete', prev));
			images.map((image) => modifiedData.append('img', image.image));
			try {
				const req = await axios.post(
					`http://localhost:8080/updatepostlist`,
					modifiedData,
					{ headers: { 'Content-Type': 'multipart/form-data' } }
				);
				console.log(req.data);
			} catch (error) {
				console.log(error);
			}
			setIsChange((p) => !p);
			cancelModify();
		} else {
			return;
		}
	};
	const deletePrevImages = (toDelete, id) => {
		const comparisonName = deleteImages.filter((x) => [toDelete].includes(x));
		const deleteImg = loadImages.filter((arr) => arr.FileName !== toDelete);
		setLoadImages(() => [...deleteImg]);
		if (comparisonName.length === 0) {
			setDeleteImages((p) => [...p, toDelete]);
		} else {
			return;
		}
	};
	const deleteList = async () => {
		try {
			const req = await axios.post(`http://localhost:8080/deletelist`, {
				id: userId,
				title: list.Title,
			});
		} catch (error) {
			console.log(error);
		}
		console.log('herererer');
		setIsChange((p) => !p);
		cancelModify();
	};
	const openDelete = () => {
		setIsDelete((p) => (p = true));
	};
	const closeDelete = () => {
		setIsDelete((p) => (p = false));
	};
	const onDelete = () => {
		deleteList();
		closeDelete();
	};
	useEffect(() => {
		console.log(loadImages);
	}, [loadImages]);
	useEffect(() => {
		console.log(deleteImages);
	}, [deleteImages]);
	return (
		<ListWrapper>
			<ListTitle>
				<div>
					{index + 1}. {list.Title}
				</div>
				{modify ? (
					<ModifyBtn onClick={cancelModify}>취소</ModifyBtn>
				) : (
					<ModifyBtn onClick={onModify}>수정</ModifyBtn>
				)}
			</ListTitle>
			{modify ? (
				<CreateForm onSubmit={submitModify}>
					<div>
						<label htmlFor='title'>수정할 이름을 적어주세요!</label>
						<input
							value={title}
							onChange={insertTitle}
							id='title'
							type='text'
							placeholder='100자 이내'
						/>
						{onTitleChange ? (
							title.length > 0 ? (
								overlapList.length === 0 ? null : (
									<span>겹치는 버킷리스트가 있어요</span>
								)
							) : (
								<span>제목 줘</span>
							)
						) : null}
					</div>
					<div>
						<label htmlFor='contents'>계획이나 소감을 적어주세요!</label>
						<textarea
							value={contents}
							onChange={insertContents}
							id='contents'
							type='text'
							placeholder='200자 이내'
							rows={5}
							maxLength={200}
						/>
					</div>
					<div>
						<label htmlFor='picture'>기념할 사진이 있으신가요?</label>
						<ImagePreviewWrapper>
							<PhotoContainer>
								{loadImages.map((loadImage, index) => (
									<div key={loadImage.id}>
										<img
											src={`http://localhost:8080/${userId}/${list.Title}/${loadImage.FileName}`}
											alt=''
										/>
										<ImgDelButton
											type='button'
											onClick={() => {
												deletePrevImages(loadImage.FileName, index);
											}}
										>
											<img src={deleteIcon} alt='' />
										</ImgDelButton>
									</div>
								))}
							</PhotoContainer>
							{loadedImages.map((loadedImage) => (
								<ImagePreview key={loadedImage.key}>
									<img src={loadedImage.image} alt='' />
									<ImgDelButton onClick={() => deleteImg(loadedImage.key)}>
										<img src={deleteIcon} alt='' />
									</ImgDelButton>
								</ImagePreview>
							))}
							<input
								id='picture'
								type='file'
								accept='image/*'
								onChange={insertImg}
								ref={selectImage}
							/>
							<button type='button' onClick={() => selectImage.current.click()}>
								추가하기
							</button>
						</ImagePreviewWrapper>
					</div>
					<div>
						<button type='button' onClick={() => openDelete()}>
							이 버킷리스트를 삭제할래요
						</button>
						<button type='submit'>
							<img src={confirm} alt='' />
							수정완료
						</button>
					</div>
				</CreateForm>
			) : null}
			<SeparateBar margin={'20px'} />
			{isDelete ? (
				<ConfirmDeleteContainer>
					<div>
						<span>{list.Title}</span>의 정보와 <span>버킷플라워</span>가 함께
						삭제돼요. 괜찮으신가요?
					</div>
					<div>
						<button type='button' onClick={() => closeDelete()}>
							취소
						</button>
						<button type='button' onClick={() => onDelete()}>
							삭제
						</button>
					</div>
				</ConfirmDeleteContainer>
			) : null}
		</ListWrapper>
	);
}

export default CreatedList;
