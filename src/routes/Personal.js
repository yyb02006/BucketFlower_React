import Header from '../components/Header';
import Background from '../components/Background';
import styled, { css, keyframes } from 'styled-components';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import logo from '../assets/logo.svg';
import person96 from '../assets/personicon_96.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
import { bool } from 'prop-types';
axios.defaults.withCredentials = true;

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

const slide = (current, after) => keyframes`
	0%{
		transform: translateY(${current});
	}
	100%{
		transform: translateY(${after});
	}
`;

const moveMenu = () => css`
	animation: ${moveMenuFrames()} 0.2s linear forwards;
`;

const moveMenuReverse = () => css`
	animation: ${moveMenuBar} 0.2s linear forwards;
`;

const BackgroundWrapper = styled.div`
	width: 100vw;
	min-height: 920px;
	height: 100%;
	position: absolute;
	overflow: hidden;
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
	max-height: 1000px;
	min-height: 900px;
	position: relative;
	margin-left: 10px;
	top: -10px;
`;

const FlowerInner = styled.div`
	min-width: 580px;
	max-height: 1000px;
	min-height: 900px;
	border-radius: 0 0 16px 16px;
	filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.35));
	background-color: #fafafa;
	position: relative;
`;

const FlowerImgBox = styled.div`
	max-height: 1000px;
	min-height: 900px;
`;

const DisplayedContainer = styled.div`
	position: absolute;
	transform: translate(0, 0);
	left: ${(props) => props.left};
	top: ${(props) => props.top};
	${(props) =>
		props.outline
			? css`
					outline: 2px solid #65e8c4;
			  `
			: null}
`;

const DisplayedImg = styled.img`
	left: ${(props) => props.left};
	top: ${(props) => props.top};
`;

const DisplayedDelete = styled.img`
	position: absolute;
	cursor: pointer;
	right: -6px;
	top: -6px;
	width: 20px;
	filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.25));
`;

const InnerLogo = styled.div`
	margin-top: 10px;
	padding: 0 24px;
	height: 120px;
	display: flex;
	align-items: center;
	position: absolute;
	top: 0;
	/* background-color: brown; */
`;

const Logo = styled.img``;

const Adornment = styled.button`
	position: absolute;
	bottom: 0px;
	right: 0px;
	margin: 16px;
	padding: 0;
	color: #404040;
	background-color: transparent;
	font-size: 1rem;
	font-weight: 400;
`;

const UserBoard = styled.div`
	margin-left: 20px;
	width: 580px;
	padding-top: 36px;
	position: relative;
	animation-duration: 0.3s;
	animation-timing-function: ease-in-out;
	${(props) =>
		props.top
			? css`
					animation-name: ${slide(0, '-324px')};
					animation-fill-mode: forwards;
			  `
			: css`
					animation-name: ${slide('-324px', 0)};
			  `}
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
	& > div:nth-child(3) {
		max-width: 580px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		font-weight: 400;
		font-size: 0.875rem;
		padding-top: 8px;
	}
	& > div:nth-child(3) > span {
		margin: 0 12px;
		cursor: pointer;
	}
	& > div:nth-child(3) > span:hover {
		color: #32a797;
	}
	& > div:nth-child(3) > div {
		border-right: 2px solid #909090;
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
	color: ${(props) => (props.isSelect < 2 ? '#32a797' : '#bcbcbc')};
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
	color: ${(props) => (props.isSelect === 2 ? '#32a797' : '#bcbcbc')};
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
	animation: ${MoveBox} 0.5s;
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

const FlowerListContainer = styled.div`
	${(props) =>
		props.height
			? css`
					height: 900px;
			  `
			: css`
					height: 520px;
			  `};
	overflow: overlay;
	position: relative;
`;

const FlowerList = styled.div`
	width: 580px;
	margin-top: 44px;
	animation: ${MoveBox} 0.5s;
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
	& div:nth-child(2) {
		display: flex;
		flex-wrap: wrap;
	}
	& div:nth-child(2) > div {
		margin-bottom: 6px;
	}
	& div:nth-child(2) > div:not(:nth-child(4n)) {
		margin-right: 6px;
	}
`;

const Theme = styled.div`
	margin-bottom: 12px;
	font-size: 1.125rem;
	font-weight: 500;
	color: #404040;
`;

const BranchWrapper = styled.div`
	width: 140px;
	height: 200px;
	background-color: #efefef;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	${(props) =>
		props.isSelected
			? css`
					outline: 2px solid #65e8c4;
			  `
			: null}
`;

const RewardsBox = styled.div`
	position: absolute;
	transform: translate(0, 0);
	${(props) =>
		props.droped
			? !props.used
				? css`
						outline: 2px solid #65e8c4;
				  `
				: null
			: null};
	${(props) =>
		props.used
			? css`
					opacity: 40%;
			  `
			: css`
					cursor: pointer;
			  `}
`;

const Rewards = styled.img`
	position: relative;
`;

const RewardsShadow = styled.img`
	position: absolute;
	opacity: 40%;
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

const NicknameModal = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.35);
	position: fixed;
	top: 0;
	z-index: 1000;
	& > div {
		width: 400px;
		background-color: #fafafa;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 16px;
		filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25));
	}
	& > div > div {
		padding: 20px;
	}
	& > div > div > div:nth-child(1) {
		border-bottom: 4px solid #32a797;
		width: 170px;
		margin-bottom: 4px;
	}
	& > div > div > div:nth-child(2) {
		font-size: 1.125rem;
		font-weight: 500;
		margin-bottom: 36px;
	}
	& > div > div > input {
		width: calc(100% - 32px);
		padding: 12px 16px;
	}
`;

const ModalBtn = styled.div`
	margin-top: 36px;
	display: flex;
	justify-content: space-between;
	& > button {
		color: #404040;
		font-weight: 400;
		font-size: 1rem;
		padding: 0;
		background-color: transparent;
	}
	& > button:nth-child(2) {
		color: #32a797;
		font-weight: 400;
		font-size: 1rem;
		padding: 0;
		background-color: transparent;
	}
`;

const WarnSpan = styled.span`
	font-size: 0.875rem;
	font-weight: 400;
	color: #ff4500;
	display: block;
`;

const SucSpan = styled.span`
	font-size: 0.875rem;
	font-weight: 400;
	color: #32a797;
	display: block;
`;

const Test = styled.div`
	position: fixed;
	width: 500px;
	height: 500px;
	background-color: crimson;
	top: 0;
	left: 0;
`;

function Personal({ isLogin }) {
	const [isUser, setIsUser] = useState('');
	const [userName, setUserName] = useState('');
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
	const [isUserImageName, setIsUserImageName] = useState(false);
	const [overlapList, setOverlapList] = useState('');
	const [changedName, setChangedName] = useState('');
	const [ChangedNameAlert, setChangedNameAlert] = useState(false);
	const [onNameModal, setOnNameModal] = useState(false);
	const [rewards, setRewards] = useState([]);
	const [rewardsStat, setRewardsStat] = useState([]);
	const [adornment, setAdornment] = useState(false);
	const [dropedRewards, setDropedRewards] = useState([]);
	const [dropedLocation, setDropedLocation] = useState({
		clientX: 0,
		clientY: 0,
		originalX: 0,
		originalY: 0,
	});
	const [dropedStyles, setDropedStyles] = useState({
		left: 0,
		top: 0,
	});
	const [displayed, setDisplayed] = useState([]);
	const move = useNavigate();
	const containerRef = useRef();
	const selectImage = useRef();
	const profileImage = useRef();
	const rewardsRef = useRef([]);
	const displayedRef = useRef([]);
	const themes = {
		branch: '가지',
		stem: '줄기',
		red: '붉은꽃',
		purple: '보라꽃',
		rounded: '둥근잎',
		pointed: '뾰족잎',
	};
	let rewardsStatArr = [...rewardsStat];
	let newDroped = [...dropedRewards];
	let uclientX = 0;
	let uclientY = 0;
	let prevArr = dropedLocation;

	console.log(dropedRewards);

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
			setTotalList(req.data.length);
			setUserList(req.data);
		} catch (error) {
			console.log(error);
		}
	};

	const selectUserImage = async () => {
		try {
			const req = await axios.post('http://localhost:8080/userprofile', {
				userid: isUser,
			});
			setUserImageName((p) => (p = req.data[0].userimage));
		} catch (error) {
			console.log(error);
		}
	};

	const selectUser = async () => {
		try {
			const req = await axios.post('http://localhost:8080/users', {
				userid: isUser,
			});
			setUserName(req.data[0].usernickname);
		} catch (error) {
			console.log(error);
		}
	};

	const loadUserRewards = async () => {
		try {
			const req = await axios.post('http://localhost:8080/selectreward', {
				userid: isUser,
			});
			setRewards(req.data);
		} catch (error) {
			console.log(error);
		}
	};

	const submitDisplayed = async () => {
		console.log(dropedRewards);
		try {
			const req = await axios.post('http://localhost:8080/submitdisplayed', {
				displayed: dropedRewards,
				userid: isUser,
			});
			loadDisplayed();
		} catch (error) {
			console.log(error);
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

	const deleteDisplayed = async (key, index) => {
		try {
			const req = await axios.post('http://localhost:8080/deletedisplayed', {
				userid: isUser,
				imagekey: key,
			});
			//empty는 undefined로 처리가 되는데, 이걸 setState메서드나 콘솔로 불러오면 즉, 함수의 인자로 넣으면
			newDroped.splice(key - 1, 1, undefined);
			setDropedRewards((p) => (p = newDroped));
			rewardsStatArr.splice(key - 1, 1, undefined);
			setRewardsStat((p) => (p = rewardsStatArr));
			loadDisplayed();
		} catch (error) {
			console.log(error);
		}
	};

	useLayoutEffect(() => {
		auth();
	}, []);

	useLayoutEffect(() => {
		if (isUser) {
			selectList();
		} else {
			return;
		}
	}, [isUser, isOpen, createList, isChange]);

	useLayoutEffect(() => {
		if (isUser) {
			selectUserImage();
		} else {
			return;
		}
	}, [isUser, isOpen, createList, isChange, isUserImageName]);

	useLayoutEffect(() => {
		if (isUser) {
			selectUser();
		} else {
			return;
		}
	}, [isUser, onNameModal]);

	useLayoutEffect(() => {
		if (isUser) {
			loadDisplayed();
		}
	}, [isUser]);

	useEffect(() => {
		const checkOverlap = userList.filter((arr) => arr.Title === title);
		setOverlapList((p) => (p = checkOverlap));
	}, [title]);

	useEffect(() => {
		if (selectMenu === 2) {
			loadUserRewards();
		}
	}, [selectMenu]);

	//onEvent func 처리
	const changeMenu = () => {
		setSelectMenu((p) => (p = 1));
	};

	const changeMenuReverse = () => {
		setSelectMenu((p) => (p = 2));
	};

	const openModal = () => {
		setOnNameModal((p) => (p = true));
		setChangedName((p) => (p = ''));
	};

	const closeModal = () => {
		setOnNameModal((p) => (p = false));
	};

	const onChangeName = (e) => {
		setChangedName((p) => (p = e.target.value));
		setChangedNameAlert((p) => (p = true));
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

	const Logout = async () => {
		try {
			const req = await axios.get('http://localhost:8080/logout');
			move('/');
		} catch (error) {
			console.log(error);
		}
	};

	const onAdornment = () => {
		if (adornment === false) {
			setSelectMenu((p) => (p = 2));
		} else if (adornment === true) {
			submitDisplayed();
			setSelectMenu((p) => (p = 1));
		}
		setAdornment((p) => !p);
	};

	const dragStartHandler = (e, key, isReward) => {
		setDropedLocation({
			clientX: e.clientX,
			clientY: e.clientY,
			originalX: e.target.offsetLeft,
			originalY: e.target.offsetTop,
		});

		uclientX = e.clientX;
		uclientY = e.clientY;
		if (isReward) {
			rewardsStatArr[key - 1] = { isSelected: true };
			setRewardsStat((p) => (p = rewardsStatArr));
		}
	};

	const dragHandler = (e) => {
		e.target.style.left = `${
			e.target.offsetLeft + e.clientX - dropedLocation.clientX
		}px`;
		e.target.style.top = `${
			e.target.offsetTop + e.clientY - dropedLocation.clientY
		}px`;
		uclientX = e.clientX;
		uclientY = e.clientY;
		prevArr.clientX = e.clientX;
		prevArr.clientY = e.clientY;
		setDropedLocation((p) => (p = prevArr));
		let targetStyles = {
			left: e.target.offsetLeft + e.clientX - dropedLocation.clientX,
			top: e.target.offsetTop + e.clientY - dropedLocation.clientY,
		};
		setDropedStyles((p) => (p = targetStyles));
	};

	const dropHandler = (e) => {
		return;
	};

	const dragEndHandler = (e, index, ref, isReward, info) => {
		if (isReward) {
			rewardsStatArr[info.key - 1] = { isSelected: false };
			setRewardsStat((p) => (p = rewardsStatArr));
		}
		const clientLeft = ref.getBoundingClientRect().left;
		const clientTop = ref.getBoundingClientRect().top;
		const clientRight = ref.getBoundingClientRect().right;
		const clientBottom = ref.getBoundingClientRect().bottom;
		const boxLeft = containerRef.current.getBoundingClientRect().left;
		const boxTop = containerRef.current.getBoundingClientRect().top;
		const boxRight = containerRef.current.getBoundingClientRect().right;
		const boxBottom = containerRef.current.getBoundingClientRect().bottom;
		newDroped[index] = {
			imagekey: info.key,
			userid: info.userid,
			filename: info.filename,
			posx: e.clientX + clientLeft - boxLeft,
			posy: e.clientY + clientTop - boxTop,
		};
		// console.log(e.target.offsetLeft + e.clientX - dropedLocation.clientX);
		if (
			e.clientX + clientLeft > boxLeft &&
			e.clientX + clientRight < boxRight &&
			e.clientY + clientTop > boxTop &&
			e.clientY + clientBottom < boxBottom
		) {
			e.target.style.left = `${
				e.target.offsetLeft + e.clientX - dropedLocation.clientX
			}px`;
			e.target.style.top = `${
				e.target.offsetTop + e.clientY - dropedLocation.clientY
			}px`;
			setDropedRewards((p) => (p = newDroped));
			// if (isReward) {
			// 	rewardsStatArr[info.key - 1] = { isInDropBox: true };
			// 	setRewardsStat((p) => (p = rewardsStatArr));
			// }
		} else {
			e.target.style.left = `${dropedLocation.originalX}px`;
			e.target.style.top = `${dropedLocation.originalY}px`;
		}
	};

	const dragLeaveHandler = (e) => {
		e.preventDefault();
	};

	const resetDroped = (index) => {
		rewardsRef.current[index].style.left = 'auto';
		rewardsRef.current[index].style.top = 'auto';
		let reset = dropedRewards;
		reset.splice(index, 1, undefined);
		setDropedRewards((p) => (p = reset));
		rewardsStatArr.splice(index, 1, undefined);
		setRewardsStat((p) => (p = rewardsStatArr));
	};

	// useEffect(() => {
	// 	console.log(rewardsStat);
	// }, [rewardsStat]);

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
		if (title.length > 0 && overlapList.length === 0) {
			const imgData = new FormData();
			imgData.append('title', title);
			imgData.append('contents', contents);
			imgData.append('author', isUser);
			images.map((image) => imgData.append('img', image.image));
			const req = await axios.post(
				`http://localhost:8080/userThumbnail`,
				imgData,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
			cancelSheets();
		} else if (title.length === 0) {
			setOnTitleChange((p) => (p = true));
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

	const updateUserName = async () => {
		try {
			const req = await axios.post(`http://localhost:8080/changeusernickname`, {
				id: isUser,
				name: changedName,
			});
			setUserName((p) => (p = changedName));
			closeModal();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setContainerWidth(containerRef.current.offsetWidth);
	});

	const rewardsList = (listTitle, theme) => {
		return (
			<FlowerList>
				<Theme>{listTitle}</Theme>
				<div>
					{rewards
						.filter((arr) => arr.theme === theme)
						.map((arr, index) => (
							<BranchWrapper
								key={arr.id}
								isSelected={
									rewardsStat[arr.id - 1]
										? rewardsStat[arr.id - 1].isSelected
										: false
								}
							>
								{rewardsStat[arr.id - 1] ? (
									rewardsStat[arr.id - 1].isSelected ? (
										<RewardsShadow
											src={`http://localhost:8080/images/${arr.filename}.svg`}
											alt=''
										></RewardsShadow>
									) : null
								) : null}
								<RewardsBox
									draggable={
										adornment
											? !displayed.map((keys) => keys.key).includes(arr.id)
												? true
												: false
											: false
									}
									onDragStart={(e) => dragStartHandler(e, arr.id, true)}
									onDrag={(e) => dragHandler(e)}
									onDragEnd={(e) =>
										dragEndHandler(
											e,
											arr.id - 1,
											rewardsRef.current[index],
											true,
											{
												key: arr.id,
												userid: arr.userid,
												filename: arr.filename,
											}
										)
									}
									onDrop={(e) => dropHandler(e)}
									onDragOver={() => false}
									used={
										adornment
											? displayed.map((keys) => keys.imagekey).includes(arr.id)
												? true
												: false
											: false
									}
									droped={
										dropedRewards
											.filter((array) => !array === false)
											.map((keys) => keys.imagekey)
											.includes(arr.id)
											? rewardsStat[arr.id - 1]
												? true
												: false
											: false
									}
									ref={(el) => (rewardsRef.current[index] = el)}
								>
									<Rewards
										src={`http://localhost:8080/images/${arr.filename}.svg`}
										alt=''
										draggable={false}
									/>
									{adornment ? (
										<DisplayedDelete
											src={deleteIcon}
											alt=''
											draggable={false}
											onClick={() => resetDroped(arr.id - 1)}
										/>
									) : null}
								</RewardsBox>
							</BranchWrapper>
						))}
				</div>
			</FlowerList>
		);
	};

	return (
		<BackgroundWrapper>
			<Background />
			<PersonalWrapper>
				<FlowerContainer
					ref={containerRef}
					width={containerWidth}
					onDragLeave={(e) => dragLeaveHandler(e)}
				>
					<FlowerInner>
						<FlowerImgBox>
							{displayed.map((arr, index) => (
								<DisplayedContainer
									key={arr.id}
									left={`${arr.posx}px`}
									top={`${arr.posy}px`}
									outline={adornment ? true : false}
									draggable={adornment ? true : false}
									onDragStart={(e) => dragStartHandler(e, arr.imagekey, false)}
									onDrag={(e) => dragHandler(e)}
									onDragEnd={(e) =>
										dragEndHandler(
											e,
											arr.imagekey - 1,
											displayedRef.current[index],
											false,
											{
												key: arr.imagekey,
												userid: arr.userid,
												filename: arr.filename,
											}
										)
									}
									ref={(el) => (displayedRef.current[index] = el)}
								>
									<DisplayedImg
										src={`http://localhost:8080/images/${arr.filename}.svg`}
										alt=''
										draggable={false}
									/>
									{adornment ? (
										<DisplayedDelete
											src={deleteIcon}
											alt=''
											draggable={false}
											onClick={() => deleteDisplayed(arr.imagekey, index)}
										/>
									) : null}
								</DisplayedContainer>
							))}
						</FlowerImgBox>
						<InnerLogo>
							<Link to='/userhome'>
								<Logo src={logo} alt='' />
							</Link>
						</InnerLogo>
						<Adornment onClick={onAdornment}>
							{adornment ? '그만꾸미기' : '꾸미기'}
						</Adornment>
					</FlowerInner>
				</FlowerContainer>
				<UserBoard top={adornment}>
					<UserProfile>
						<UserPictureWrapper>
							<UserPicture
								src={
									userImageName
										? userImageName === 'person96'
											? person96
											: `http://localhost:8080/${isUser}/profile/${userImageName}`
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
						<div>
							<span onClick={openModal}>닉네임변경</span>
							<div></div>
							<span>SNS연동관리</span>
							<div></div>
							<span onClick={Logout}>로그아웃</span>
						</div>
					</UserProfile>
					<BoardMenu>
						<div>
							<TodoListBtn
								isSelect={selectMenu}
								onClick={changeMenu}
								disabled={selectMenu < 2 ? true : false}
							>
								나의 버킷리스트
							</TodoListBtn>
							<TodoListBar isSelect={selectMenu}></TodoListBar>
						</div>
						<div>
							<FlowerListBtn
								isSelect={selectMenu}
								onClick={changeMenuReverse}
								disabled={selectMenu === 2 ? true : false}
							>
								나의 버킷플라워
							</FlowerListBtn>
						</div>
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
											isCompleted={list.isCompleted}
											key={index}
										></UserPost>
								  ))
								: null}
						</TodoList>
					) : (
						<FlowerListContainer height={adornment}>
							<FlowerList>
								<Theme>{themes.branch}</Theme>
								<div>
									{rewards
										.filter((arr) => arr.theme === 'branch')
										.map((arr, index) => (
											<BranchWrapper
												key={arr.id}
												isSelected={
													rewardsStat[arr.id - 1]
														? rewardsStat[arr.id - 1].isSelected
														: false
												}
											>
												{rewardsStat[arr.id - 1] ? (
													rewardsStat[arr.id - 1].isSelected ? (
														<RewardsShadow
															src={`http://localhost:8080/images/${arr.filename}.svg`}
															alt=''
														></RewardsShadow>
													) : null
												) : null}
												<RewardsBox
													draggable={
														adornment
															? !displayed
																	.map((keys) => keys.key)
																	.includes(arr.id)
																? true
																: false
															: false
													}
													onDragStart={(e) => dragStartHandler(e, arr.id, true)}
													onDrag={(e) => dragHandler(e)}
													onDragEnd={(e) =>
														dragEndHandler(
															e,
															arr.id - 1,
															rewardsRef.current[index],
															true,
															{
																key: arr.id,
																userid: arr.userid,
																filename: arr.filename,
															}
														)
													}
													onDrop={(e) => dropHandler(e)}
													onDragOver={() => false}
													used={
														adornment
															? displayed
																	.map((keys) => keys.imagekey)
																	.includes(arr.id)
																? true
																: false
															: false
													}
													droped={
														adornment
															? dropedRewards
																	.filter((array) => !array === false)
																	.map((keys) => keys.imagekey)
																	.includes(arr.id)
																? rewardsStat[arr.id - 1]
																	? true
																	: false
																: false
															: false
													}
													ref={(el) => (rewardsRef.current[index] = el)}
												>
													<Rewards
														src={`http://localhost:8080/images/${arr.filename}.svg`}
														alt=''
														draggable={false}
													/>
													{adornment ? (
														<DisplayedDelete
															src={deleteIcon}
															alt=''
															draggable={false}
															onClick={() => resetDroped(arr.id - 1)}
														/>
													) : null}
												</RewardsBox>
											</BranchWrapper>
										))}
								</div>
							</FlowerList>
							{rewardsList(themes.purple, 'purple')}
						</FlowerListContainer>
					)}
				</UserBoard>
				{createList ? null : (
					<WriteButtonWrapper>
						<WriteButton
							type='image'
							src={write}
							onClick={onWrite}
						></WriteButton>
					</WriteButtonWrapper>
				)}
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
											fullList={userList}
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
			{onNameModal ? (
				<NicknameModal>
					<div>
						<div>
							<div></div>
							<div>새로운 닉네임을 입력해주세요</div>
							<input
								onChange={onChangeName}
								value={changedName}
								type='text'
								placeholder='10자 이내의 한글, 영문, 숫자'
							/>
							{ChangedNameAlert ? (
								changedName.length < 1 ? (
									<WarnSpan>닉네임을 입력해주세요</WarnSpan>
								) : changedName.length > 10 ? (
									<WarnSpan>닉네임은 10자 이하만 입력 가능합니다.</WarnSpan>
								) : changedName === userName ? (
									<WarnSpan>변경전과 같은 닉네임 입니다.</WarnSpan>
								) : (
									<SucSpan>사용가능한 닉네임 입니다.</SucSpan>
								)
							) : null}
							<ModalBtn>
								<button onClick={closeModal}>취소</button>
								<button onClick={updateUserName}>확인</button>
							</ModalBtn>
						</div>
					</div>
				</NicknameModal>
			) : null}
		</BackgroundWrapper>
	);
}

export default Personal;
