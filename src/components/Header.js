import styled, { css, keyframes } from 'styled-components';
import img from '../assets/logo.svg';
import person from '../assets/personicon_48.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
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

const MoveMenu = () => keyframes`
	0%{
		transform: translateY(20px);
		opacity: 0%;
	}
	100%{
		transform: translateY(0px);
		opacity: 100%;
	}
`;

const GlobalNav = styled.div`
	margin: 0 auto;
	overflow: hidden;
	max-width: 1760px;
	/* background-color: cornsilk; */
`;

const Navdiv = styled.div`
	display: flex;
	align-items: center;
	height: 120px;
	padding: 0 40px;
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
	${(props) => (props.marginSet ? null : 'margin-left: auto')}
`;

const Logo = styled.img`
	/* ${(props) => props.move === '/personal' && LoginStyle(-100)}; */
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const Person = styled.img`
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const DropMenu = styled.div`
	width: 100px;
	height: 100px;
	position: absolute;
	right: 100px;
	background-color: crimson;
	animation: ${MoveMenu} 1s;
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const GreetBox = styled.div`
	height: 50px;
	margin-left: auto;
	margin-right: 36px;
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
	const [menuDown, setMenuDown] = useState(true);
	const location = useLocation();

	const auth = async () => {
		try {
			const req = await axiosInstance.get('http://localhost:8080/authtoken');
			console.log(req);
			setIsUser((p) => (p = req.data.id));
		} catch (error) {
			console.log('auth' + error);
		}
	};

	useEffect(() => {
		auth();
	}, []);

	const mouseEnter = () => {
		setMenuDown((p) => (p = true));
	};

	const mouseLeave = () => {
		setMenuDown((p) => (p = false));
	};
	const logout = async () => {
		try {
			const req = await axios.get('http://localhost:8080/logout');
			console.log(req);
			setIsUser((p) => (p = req.data));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<GlobalNav>
			<Navdiv>
				<Link to='/'>
					<Logo src={img} alt='' move={location.pathname} />
				</Link>
				{isUser ? (
					<GreetBox>
						<Greet>{isUser}님 반가워요!</Greet>
						<MyFlowerLink>나의 버킷플라워 보러 가기</MyFlowerLink>
					</GreetBox>
				) : null}
				<LoginBtn
					move={location.pathname}
					onMouseEnter={mouseEnter}
					onMouseLeave={mouseLeave}
					marginSet={isUser}
				>
					{isUser ? (
						<div>
							<NavLink to='/personal'>
								<Person src={person} alt='' />
							</NavLink>
							<DropMenu>
								<button onClick={logout}>Logout</button>
							</DropMenu>
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
