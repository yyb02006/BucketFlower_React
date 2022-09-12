import Header from '../components/Header';
import Background from '../components/Background';
import styled, { css, keyframes } from 'styled-components';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import logo from '../assets/logo.svg';
import person96 from '../assets/personicon_96.svg';
import { Link, NavLink } from 'react-router-dom';
import write from '../assets/writebutton.svg';
import cancel from '../assets/cancel_icon.svg';
import confirm from '../assets/confirm.svg';
import addIcon from '../assets/add_icon.svg';
import axios from 'axios';
import axiosInstance from '../utils/axiosConfig';
import deleteIcon from '../assets/deleteImg_icon.svg';
import profilePictureIcon from '../assets/profilepicture_icon.svg';
import UserPost from '../components/UserPost';
import CreatedList from '../components/CreatedList';

const moveMenuBar = keyframes`
	0%{
		right: -290px;
	}
	100%{
		right: 0;
	}
`;

const moveMenuFrames = () => keyframes`
	0%{
		right: 0;
	}
	100%{
		right: -290px;
	}
`;

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

const moveMenu = () => css`
	animation: ${moveMenuFrames()} 0.2s linear forwards;
`;

const moveMenuReverse = () => css`
	animation: ${moveMenuBar} 0.2s linear forwards;
`;

const PersonalWrapper = styled.div`
	max-width: 1200px;
	height: 95vh;
	margin: 0 auto;
	position: relative;
	display: flex;
`;

const FlowerContainer = styled.div`
	min-width: 580px;
	/* height: ${(props) => (props.width * 900) / 580}px; */
	max-height: 1000px;
	min-height: 900px;
	border-radius: 0 0 16px 16px;
	filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.35));
	background-color: #fafafa;
	position: relative;
	margin-left: 10px;
	top: -10px;
`;

const InnerLogo = styled.div`
	margin-top: 10px;
	padding: 0 24px;
	height: 120px;
	display: flex;
	align-items: center;
	/* background-color: brown; */
`;

const Logo = styled.img``;

const UserBoard = styled.div`
	margin-left: 20px;
	width: 580px;
	padding-top: 36px;
`;

const UserProfile = styled.div`
	height: 224px;
	& > div:nth-child(2) {
		max-width: 580px;
		margin: 0 auto;
		padding-top: 24px;
		font-size: 1.25rem;
		font-weight: 400;
		display: flex;
		justify-content: center;
	}
	& > div:nth-child(2) > span {
		color: #32a797;
	}
`;

const UserPictureWrapper = styled.div`
	position: relative;
	width: 96px;
	margin: 0 auto;
	& > img:nth-child(2) {
		border-radius: 48px;
		position: absolute;
		bottom: 4px;
		right: 4px;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.35));
		cursor: pointer;
	}
	& > input {
		display: none;
	}
`;

const UserPicture = styled.img`
	display: block;
	width: 96px;
	height: 96px;
	border-radius: 48px;
	object-fit: cover;
`;

const BoardMenu = styled.div`
	height: 64px;
	background-color: #bcbcbc;
	& > div {
		display: inline-block;
	}
`;

const TodoListBar = styled.div`
	position: relative;
	border-bottom: 4px solid #32a797;
	width: 290px;
	${(props) =>
		props.isSelect > 0
			? props.isSelect === 1
				? moveMenuReverse()
				: moveMenu()
			: null}
`;

const FlowerListBar = styled.div``;

const TodoListBtn = styled.button`
	display: inline-block;
	background-color: #fafafa;
	color: ${(props) => (props.isSelect < 2 ? '#404040' : '#bcbcbc')};
	height: 60px;
	width: 290px;
	border-radius: 0px;
	padding: 0 0 0 12px;
	margin: 0;
	font-size: 1.5rem;
	font-weight: 500;
	text-align: left;
`;

const FlowerListBtn = styled.button`
	display: inline-block;
	background-color: #fafafa;
	color: ${(props) => (props.isSelect === 2 ? '#404040' : '#bcbcbc')};
	height: 60px;
	width: 290px;
	border-radius: 0px;
	padding: 0 0 0 12px;
	font-size: 1.5rem;
	font-weight: 500;
	text-align: left;
`;

const TodoList = styled.div`
	font-size: 1rem;
	font-weight: 400;
	width: 580px;
	height: 600px;
	margin-top: 44px;
	animation: ${MoveBox} 1s;
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const TodoListInfo = styled.div`
	margin-bottom: 24px;
	& > span:nth-child(1) {
		color: #32a797;
	}
	& > span:nth-child(2) {
		color: #f6b95f;
	}
`;

const SeparateBar = styled.div`
	border-bottom: 2px solid #e9e9e9;
`;

const FlowerList = styled.div`
	width: 580px;
	height: 600px;
	background-color: skyblue;
	margin-top: 44px;
	animation: ${MoveBox} 1s;
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const WriteButton = styled.input`
	border-radius: 36px;
	width: 72px;
	height: 72px;
	position: fixed;
	z-index: 10;
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
	&:focus {
		outline: none;
	}
`;

const WriteButtonWrapper = styled.div`
	position: absolute;
	right: 82px;
	bottom: 0px;
	height: 72px;
`;

const CreateContainer = styled.div`
	top: 0px;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	position: absolute;
	& > div {
		border-radius: 24px;
		position: relative;
		top: 100px;
		width: calc(1180px - 60px);
		border-radius: 24px;
		background-color: #fafafa;
		margin: 0 auto;
		padding: 24px 30px;
		animation: ${MoveBox} 1s;
		animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
	}
`;

const CancelButton = styled.button`
	padding: 0;
	background-color: #fafafa;
	color: #404040;
	font-size: 1rem;
	font-weight: 400;
	border-radius: 0;
	display: flex;
	align-items: center;
	margin-left: auto;
	& > img {
		margin-right: 6px;
	}
`;

const CreateTitle = styled.div`
	font-size: 1.5rem;
	font-weight: 500;
	margin-top: 8px;
	margin-bottom: 60px;
	& > div {
		width: 150px;
		border-bottom: 4px solid #32a797;
		margin-bottom: 8px;
	}
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
	& > div:nth-child(4) > button > img {
		margin-right: 6px;
	}
`;

const CreateSheetsBtn = styled.button`
	background-color: #fafafa;
	color: #404040;
	border-radius: 0;
	padding: 0;
	font-size: 1.25rem;
	font-weight: 400;
	padding-top: 24px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	& > img {
		margin-right: 6px;
	}
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

const CreatedListWrapper = styled.div`
	margin-top: 20px;
`;

function Personal({ isLogin }) {
	const [isUser, setIsUser] = useState('');
	const [selectMenu, setSelectMenu] = useState(0);
	const [totalList, setTotalList] = useState(0);
	const [completeList, setcompleteList] = useState(0);
	const [createList, setCreateList] = useState(false);
	const [containerWidth, setContainerWidth] = useState(580);
	const [title, setTitle] = useState('');
	const [onTitleChange, setOnTitleChange] = useState(false);
	const [contents, setContents] = useState('');
	const [images, setImages] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [loadedImages, setLoadedImages] = useState([]);
	const [loadedImagesId, setLoadedImagesId] = useState(0);
	const [userList, setUserList] = useState([]);
	const [isChange, setIsChange] = useState(false);
	const [userImageName, setUserImageName] = useState('');
	const containerRef = useRef();
	const selectImage = useRef();
	const profileImage = useRef();

	const auth = async () => {
		try {
			const req = await axiosInstance.get('http://localhost:8080/authtoken');
			// console.log(req.data.id);
			setIsUser((p) => (p = req.data.id));
		} catch (error) {
			console.log('auth' + error);
		}
	};

	const selectList = async () => {
		try {
			const req = await axios.post('http://localhost:8080/userList', {
				id: isUser,
			});
			const reqq = await axios.post('http://localhost:8080/userprofile', {
				userid: isUser,
			});
			if (reqq.data[0]) {
				setUserImageName((p) => (p = reqq.data[0].userimage));
			} else {
				return;
			}
			setTotalList(req.data.length);
			setUserList(req.data);
		} catch (error) {
			console.log(error);
		}
	};

	// const selectUserImage = async () => {
	// 	try {
	// 		const req = await axios.post('http://localhost:8080/userprofile', {
	// 			userid: isUser,
	// 		});
	// 		setUserImageName((p) => (p = req.data[0].userimage));
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useLayoutEffect(() => {
		auth();
	}, []);

	useLayoutEffect(() => {
		selectList();
		// selectUserImage();
	}, [isUser, isOpen, createList, isChange]);

	useEffect(() => {
		console.log(`ischange = ${isChange}`);
	});

	//onEvent func 처리
	const changeMenu = () => {
		setSelectMenu((p) => (p = 1));
	};

	const changeMenuReverse = () => {
		setSelectMenu((p) => (p = 2));
	};

	const onWrite = () => {
		setCreateList((p) => (p = true));
	};

	const exitForm = () => {
		setCreateList((p) => (p = false));
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

	const listSubmit = async (e) => {
		e.preventDefault();
		if (title.length > 0) {
			// console.log({ title: title, contents: contents, images: images });
			const imgData = new FormData();
			// const imagearr = images.map((image) => image.image);
			imgData.append('title', title);
			imgData.append('contents', contents);
			imgData.append('author', isUser);
			images.map((image) => imgData.append('img', image.image));
			// imgData.append('img', imagearr);
			const req = await axios.post(
				`http://localhost:8080/userThumbnail`,
				imgData,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
			cancelSheets();
		} else {
			return;
		}
		// console.log(e.target.files[0]);
		// console.log(imgData.__proto__);
	};

	const cancelSheets = () => {
		setIsOpen((p) => (p = false));
		setLoadedImages((p) => (p = []));
		setImages((p) => (p = []));
		setLoadedImagesId((p) => (p = 0));
		setTitle((p) => (p = ''));
		setContents((p) => (p = ''));
		setOnTitleChange((p) => (p = false));
	};

	const openSheets = () => {
		setIsOpen((p) => (p = true));
	};

	const updateUserImage = async (e) => {
		const image = e.target.files[0];
		const profileData = new FormData();
		profileData.append('userid', isUser);
		profileData.append('img', image);
		const req = await axios.post(
			`http://localhost:8080/userprofileimage`,
			profileData,
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		);
		setUserImageName((p) => (p = req.data));
	};

	useEffect(() => {
		setContainerWidth(containerRef.current.offsetWidth);
	});

	useEffect(() => {
		// console.log(images);
		// console.log(loadedImages);
	}, [images]);

	return (
		<div>
			<Background />
			<PersonalWrapper>
				<FlowerContainer ref={containerRef} width={containerWidth}>
					<InnerLogo>
						<Link to='/userhome'>
							<Logo src={logo} alt='' />
						</Link>
					</InnerLogo>
				</FlowerContainer>
				<UserBoard>
					<UserProfile>
						<UserPictureWrapper>
							<UserPicture
								src={
									userImageName
										? `http://localhost:8080/${isUser}/profile/${userImageName}`
										: null
								}
								alt=''
							></UserPicture>
							<img
								src={profilePictureIcon}
								alt=''
								onClick={() => profileImage.current.click()}
							/>
							<input
								type='file'
								accept='image/*'
								//함수를 실행시키지 않아야 e로 file값 받아오기 가능
								onChange={updateUserImage}
								ref={profileImage}
							/>
						</UserPictureWrapper>
						<div>
							<span>{isUser}</span>님, 환영합니다!
						</div>
					</UserProfile>
					<BoardMenu>
						<div>
							<TodoListBar isSelect={selectMenu}></TodoListBar>
							<TodoListBtn
								isSelect={selectMenu}
								onClick={changeMenu}
								disabled={selectMenu < 2 ? true : false}
							>
								나의 버킷리스트
							</TodoListBtn>
						</div>
						<div>
							<FlowerListBar isSelect={selectMenu}></FlowerListBar>
							<FlowerListBtn
								isSelect={selectMenu}
								onClick={changeMenuReverse}
								disabled={selectMenu === 2 ? true : false}
							>
								나의 버킷플라워
							</FlowerListBtn>
						</div>
						{createList ? null : (
							<WriteButtonWrapper>
								<WriteButton
									type='image'
									src={write}
									onClick={onWrite}
								></WriteButton>
							</WriteButtonWrapper>
						)}
					</BoardMenu>
					{selectMenu < 2 ? (
						<TodoList>
							{totalList > 0 ? (
								<TodoListInfo>
									총 <span>{totalList}개</span>의 버킷리스트 중{' '}
									<span>{completeList}개</span>가 완료되었습니다.
								</TodoListInfo>
							) : (
								<TodoListInfo>
									아직 버킷리스트가 작성되지 않았어요! <br />
									<span>{isUser}</span>님만의 버킷리스트를 작성해보세요!
								</TodoListInfo>
							)}
							<SeparateBar />
							{totalList > 0
								? userList.map((list, index) => (
										<UserPost
											index={index}
											list={list}
											userId={isUser}
											isOpen={createList}
											key={index}
										></UserPost>
								  ))
								: null}
						</TodoList>
					) : (
						<FlowerList></FlowerList>
					)}
				</UserBoard>
			</PersonalWrapper>
			{createList ? (
				<CreateContainer>
					<div>
						<CancelButton onClick={exitForm}>
							<img src={cancel} alt='' /> 닫기
						</CancelButton>
						<CreateTitle>
							<div></div>버킷리스트 작성하기
						</CreateTitle>
						<SeparateBar />
						<CreatedListWrapper>
							{totalList > 0
								? userList.map((list, index) => (
										<CreatedList
											key={index}
											index={index}
											list={list}
											userId={isUser}
											isOpen={createList}
											setIsChange={setIsChange}
										></CreatedList>
								  ))
								: null}
						</CreatedListWrapper>
						{isOpen ? (
							<CreateForm onSubmit={listSubmit}>
								<div>
									<label htmlFor='title'>
										새 버킷리스트의 이름을 적어주세요!
									</label>
									<input
										value={title}
										onChange={insertTitle}
										id='title'
										type='text'
										placeholder='100자 이내'
									/>
									{onTitleChange ? (
										title.length < 1 ? (
											<span>제목 줘</span>
										) : null
									) : null}
								</div>
								<div>
									<label htmlFor='contents'>
										버킷리스트의 내용을 적어주세요!
									</label>
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
										{loadedImages.map((loadedImage) => (
											<ImagePreview key={loadedImage.key}>
												<img src={loadedImage.image} alt='' />
												<ImgDelButton
													onClick={() => deleteImg(loadedImage.key)}
												>
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
										<button
											type='button'
											onClick={() => selectImage.current.click()}
										>
											추가하기
										</button>
									</ImagePreviewWrapper>
								</div>
								<div>
									<button type='button' onClick={cancelSheets}>
										취소
									</button>
									<button type='submit'>
										<img src={confirm} alt='' />
										완료
									</button>
								</div>
								<SeparateBar />
							</CreateForm>
						) : (
							<CreateSheetsBtn onClick={openSheets}>
								<img src={addIcon} alt='' />
								추가
							</CreateSheetsBtn>
						)}
					</div>
				</CreateContainer>
			) : null}
		</div>
	);
}

export default Personal;
