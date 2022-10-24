import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import RegisterBackground from '../components/RegisterBackground';
axios.defaults.withCredentials = true;

const Err = keyframes`
	0%{
		transform-origin: 50% 50%;
		transform: rotate(3deg);
		background-color: orangered;
	}
	25%{transform-origin: 50% 50%;
		transform: rotate(-3deg);}
	50%{transform-origin: 50% 50%;
		transform: rotate(3deg);}
	75%{transform-origin: 50% 50%;
		transform: rotate(-3deg);}
	100%{
		transform-origin: 50% 50%;
		transform: rotate(3deg);
		background-color: orangered;
	}
`;

const rejectJoin = () => css`
	animation: ${Err} 0.2s linear;
`;

const LoginForm = styled.form`
	border-radius: 16px;
	position: relative;
	top: calc(30vh);
	margin: 0 auto;
	width: 360px;
	background-color: #fafafa;
	filter: drop-shadow(4px 8px 24px rgba(50, 167, 151, 1));
	& > div:nth-child(1) {
		border-bottom: 4px solid #32a797;
		width: 88px;
		margin-bottom: 4px;
		position: relative;
		left: 2px;
	}
	& > span:nth-child(2) {
		display: block;
		font-weight: 600;
		font-size: 2rem;
		margin-bottom: 8px;
	}
	& > div {
		font-weight: 400;
		font-size: 0.875rem;
		margin-bottom: 40px;
	}
	& input {
		display: block;
		width: calc(100% - 40px);
		padding: 12px 20px;
		margin-top: 32px;
	}
	& button {
		width: 100%;
		margin-top: 40px;
	}
`;

const Loginbtn = styled.button`
	width: 100%;
	margin-top: 40px;
	${(props) => (props.reject === 0 ? rejectJoin() : null)}
`;

const ToSignUp = styled.span`
	color: #32a797;
	font-weight: 400;
	font-size: 0.875rem;
`;

const ErrSpan = styled.span`
	color: orangered;
	font-weight: 400;
	font-size: 0.825rem;
`;

function Login() {
	//HOOK 호출
	const [userId, setUserId] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [isUser, setIsUser] = useState(-2);
	const move = useNavigate();
	//onEvent func 처리
	const userChangeId = (e) => {
		setUserId(e.target.value);
	};
	const userChangePassword = (e) => {
		setUserPassword(e.target.value);
	};
	const setReturn = () => {
		setIsUser((p) => (p = -1));
	};
	//axios 호출
	const confirmLogin = async (e) => {
		e.preventDefault();
		try {
			const req = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
				id: userId,
				password: userPassword,
			});
			console.log(req);
			setIsUser((p) => (p = req.data.isUser));
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (isUser === 1) {
			move('/userhome');
		}
	}, [isUser]);
	console.log(isUser);
	console.log(userId, userPassword);
	return (
		<div>
			<RegisterBackground />
			<LoginForm onSubmit={confirmLogin}>
				<div></div>
				<span>로그인</span>
				<div>
					계정이 없으신가요?
					<NavLink to='/signup'>
						<ToSignUp>계정만들기</ToSignUp>
					</NavLink>
				</div>
				<input
					onChange={userChangeId}
					value={userId}
					type='text'
					placeholder='아이디'
				/>
				<input
					onChange={userChangePassword}
					value={userPassword}
					type='password'
					placeholder='비밀번호'
				/>
				<Loginbtn onAnimationEnd={setReturn} reject={isUser}>
					로그인
				</Loginbtn>
				{isUser === 0 || isUser === -1 ? (
					<ErrSpan>아이디 또는 비밀번호를 잘못 입력했습니다.</ErrSpan>
				) : null}
			</LoginForm>
		</div>
	);
}

export default Login;
