import styled, { css, keyframes } from 'styled-components';
import img from '../assets/logo.svg';
import person from '../assets/personicon_48.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
import axiosInstance from '../utils/axiosConfig';
import person96 from '../assets/personicon_96.svg';
import person48 from '../assets/personicon_48.svg';
import { checkPropTypes } from 'prop-types';
axios.defaults.withCredentials = true;

const MoveLogin = (distance) => keyframes`
	0%{
	transform: translateY(0px);
}
100%{
	transform: translateY(${distance}px);
}`;

const LoginStyle = (value) => css`
	animation: ${MoveLogin(value)} 1s forwards;
`;

const MoveUpMenu = () => keyframes`
	0%{
		transform: translateY(20px);
		opacity: 0%;
	}
	100%{
		transform: translateY(0px);
		opacity: 100%;
	}
`;

const MoveDownMenu = () => keyframes`
	0%{
		transform: translateY(0px);
		opacity: 100%;
	}
	100%{
		transform: translateY(20px);
		opacity: 0%;
	}
`;

const GlobalNav = styled.div`
	margin: 0 auto;
	overflow: hidden;
	/* background-color: cornsilk; */
`;

const Navdiv = styled.div`
	display: flex;
	align-items: center;
	height: 120px;
	padding: 0 120px;
`;

const LoginBtn = styled.span`
	font-weight: 800;
	font-size: 1rem;
	/* ${(props) => props.move === '/personal' && LoginStyle(-100)}; */
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
	& a:visited,
	& a:link {
		color: #555555;
	}
	${(props) =>
		props.marginSet
			? props.location === '/'
				? 'margin-left: auto'
				: null
			: 'margin-left: auto'}
`;

const Logo = styled.img`
	/* ${(props) => props.move === '/personal' && LoginStyle(-100)}; */
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const Person = styled.img`
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
	width: 48px;
	height: 48px;
	object-fit: cover;
	border-radius: 24px;
	&:hover {
		border-radius: 24px;
		outline: 3px solid #32c7b2;
	}
`;

const DropMenu = styled.div`
	width: 320px;
	margin-top: 16px;
	border-radius: 16px;
	filter: drop-shadow(4px 8px 10px rgba(0, 0, 0, 0.25));
	position: absolute;
	right: 120px;
	background-color: #fafafa;
	animation: ${MoveUpMenu} 0.5s forwards;
	${(props) =>
		props.status &&
		css`
			animation-name: ${MoveDownMenu};
		`}
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
	font-weight: 500;
	& > div {
		padding: 24px;
		width: calc(100%-48px);
	}
	& > div > div {
		display: flex;
		justify-content: center;
		margin: 12px 0;
	}
	& > div > div:nth-child(2) {
		font-weight: 500;
		font-size: 1.125rem;
		margin: 20px 0;
	}
	& > div > div:nth-child(3) {
		border-bottom: 1px solid #808080;
		width: 100%;
		margin: 0 auto;
	}
	& > div > div:nth-child(4) {
		width: 100%;
	}
	& button {
		display: block;
		font-size: 1.125rem;
		font-weight: 500;
		margin-top: 12px;
		width: 100%;
		padding: 12px 0;
		border-radius: 12px;
	}
`;

const MenuImg = styled.img`
	margin: 0 auto;
	display: block;
	width: 160px;
	height: 160px;
	border-radius: 80px;
`;

const Progress = styled.div`
	width: 50%;
	color: #ef9023;
	& > div {
		display: flex;
		justify-content: center;
		margin: 12px 0;
	}
`;

const Completed = styled.div`
	width: 50%;
	color: #32a797;
	& > div {
		display: flex;
		justify-content: center;
		margin: 12px 0;
	}
`;

const LogoutBtn = styled.button`
	color: #404040;
	background-color: transparent;
	color: #32a797;
	border: 2px solid #32a797;
`;

const MovePersonalBtn = styled.button`
	background-color: #32c7b2;
`;

const GreetBox = styled.div`
	height: 50px;
	margin-left: auto;
	margin-right: 24px;
`;

const Greet = styled.div`
	font-weight: 500;
`;

const MyFlowerLink = styled.div`
	font-weight: 500;
	font-size: 0.875rem;
	color: #32a797;
`;
// const NavStyle = styled(NavLink)`
// 	color: orange;
// `;

function Header() {
	const [isUser, setIsUser] = useState('');
	const [isMenuDown, setIsMenuDown] = useState(false);
	const [userProfileImage, setUserProfileImage] = useState('');
	const [userName, setUserName] = useState('');
	const [userList, setUserList] = useState([]);
	const [listTotal, setListTotal] = useState('');
	const [listCompleted, setListCompleted] = useState([]);
	const [menuAnimation, setMenuAnimation] = useState(false);
	const [visible, setVisible] = useState(isMenuDown);
	const location = useLocation();
	const move = useNavigate();

	const auth = async () => {
		try {
			const req = await axiosInstance.get('http://localhost:8080/authtoken');
			// console.log(req.data.id);
			setIsUser((p) => (p = req.data.id));
		} catch (error) {
			console.log('auth' + error);
		}
	};

	const selectUsers = async () => {
		try {
			const req = await axiosInstance.post('http://localhost:8080/users', {
				userid: isUser,
			});
			setUserProfileImage((p) => (p = req.data[0].userimage));
			setUserName((p) => (p = req.data[0].usernickname));
		} catch (error) {
			console.log(error);
		}
	};

	const selectList = async () => {
		try {
			const req = await axios.post('http://localhost:8080/userList', {
				id: isUser,
			});
			setListTotal((p) => (p = req.data.length));
			setUserList((p) => (p = req.data));
			setListCompleted(
				(p) => (p = req.data.filter((arr) => arr.isCompleted === 1))
			);
		} catch (error) {
			console.log(error);
		}
	};

	useLayoutEffect(() => {
		auth();
	}, []);

	useLayoutEffect(() => {
		if (isUser) {
			selectUsers();
			selectList();
		} else {
			return;
		}
	}, [isUser, isMenuDown]);

	const menuDown = () => {
		setIsMenuDown((p) => (p = !isMenuDown));
	};

	const MovetoPersonal = () => {
		move('/personal');
	};

	const logout = async () => {
		try {
			const req = await axios.get('http://localhost:8080/logout');
			move('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (visible && !isMenuDown) {
			setMenuAnimation(true);
			setTimeout(() => {
				setMenuAnimation(false);
			}, 500);
		}
		setVisible(isMenuDown);
	}, [visible, isMenuDown]);

	useEffect(() => {
		console.log(isMenuDown, visible);
	}, [isMenuDown]);

	useEffect(() => {
		console.log(isMenuDown, visible);
	}, [visible]);

	return (
		<GlobalNav>
			<Navdiv>
				<Link to={isUser ? '/userhome' : '/'}>
					<Logo src={img} alt='' move={location.pathname} />
				</Link>
				{location.pathname !== '/' ? (
					isUser ? (
						<GreetBox>
							<Greet>{isUser}님 반가워요!</Greet>
							<MyFlowerLink>나의 버킷플라워 보러 가기</MyFlowerLink>
						</GreetBox>
					) : null
				) : null}
				<LoginBtn
					move={location.pathname}
					marginSet={isUser}
					location={location.pathname}
				>
					{location.pathname === '/userhome' ? (
						<div>
							<Person
								onClick={menuDown}
								src={
									userProfileImage
										? userProfileImage === 'person96'
											? person48
											: `http://localhost:8080/${isUser}/profile/${userProfileImage}`
										: null
								}
								alt=''
							/>
							{!visible && !menuAnimation ? null : (
								<DropMenu status={menuAnimation}>
									<div>
										<MenuImg
											src={
												userProfileImage
													? userProfileImage === 'person96'
														? person96
														: `http://localhost:8080/${isUser}/profile/${userProfileImage}`
													: null
											}
											alt=''
										/>
										<div>{userName}님</div>
										<div></div>
										<div>
											<Progress>
												<div>진행 중</div>
												<div>{listTotal}</div>
											</Progress>
											<Completed>
												<div>완료</div>
												<div>{listCompleted.length}</div>
											</Completed>
										</div>
										<MovePersonalBtn onClick={MovetoPersonal}>
											마이페이지
										</MovePersonalBtn>
										<LogoutBtn onClick={logout}>Logout</LogoutBtn>
									</div>
								</DropMenu>
							)}
						</div>
					) : (
						<NavLink to='/login'>LOGIN</NavLink>
					)}
				</LoginBtn>
			</Navdiv>
		</GlobalNav>
	);
}

export default Header;
