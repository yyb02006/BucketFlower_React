import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import RegisterBackground from '../components/RegisterBackground';

const LoginForm = styled.form`
	position: relative;
	top: calc(30vh);
	margin: 0 auto;
	width: 360px;
	background-color: #fafafa;
	padding: 20px;
	& > span:nth-child(1) {
		font-weight: 600;
		font-size: 2.25rem;
	}
	& > div {
		font-weight: 400;
		font-size: 0.875rem;
	}
	& input {
		display: block;
		width: calc(100% - 40px);
		height: 40px;
		margin: 20px 0;
		padding: 0 20px;
		border: none;
		border-radius: 16px;
		background-color: #e9e9e9;
	}
	& button {
		font-weight: 600;
		font-size: 2rem;
		padding: 10px 20px;
		margin: 0;
		border: none;
		background-color: orange;
		border-radius: 12px;
	}
`;

const ToSignUp = styled.span`
	color: #32a797;
	font-weight: 400;
	font-size: 0.875rem;
`;

function Login() {
	const [userId, setUserId] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const userChangeId = (e) => {
		setUserId(e.target.value);
	};
	const userChangePassword = (e) => {
		setUserPassword(e.target.value);
	};
	const userSubmit = (e) => {
		e.preventDefault();
		console.log(userId, userPassword);
	};

	return (
		<div>
			<RegisterBackground />
			<LoginForm onSubmit={userSubmit}>
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
					type='text'
					placeholder='비밀번호'
				/>
				<button>confirm</button>
			</LoginForm>
		</div>
	);
}

export default Login;
