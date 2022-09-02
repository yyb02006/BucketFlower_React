import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterBackground from '../components/RegisterBackground';

const SignupForm = styled.form`
	background-color: #fafafa;
	width: 360px;
	padding: 20px;
	margin: 0 auto;
	position: relative;
	top: 30vh;
	& div {
		margin: 0 0 20px 0;
	}
	& div > span {
		font-size: 0.825rem;
		font-weight: 400;
		color: orangered;
	}
	& input {
		font-size: 0.825rem;
		display: block;
		width: calc(100% - 40px);
		height: 40px;
		padding: 0 20px;
		border: none;
		border-radius: 16px;
		background-color: #e9e9e9;
		margin-top: 20px;
	}
	& input::placeholder {
		font-size: 0.825rem;
		font-weight: 500;
	}
	& button {
		font-weight: 600;
		font-size: 2rem;
		padding: 10px 20px;
		border: none;
		background-color: orange;
		border-radius: 12px;
	}
`;

function Signup() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCover, setPasswordCover] = useState('');
	const [PrevTwoClick, setPrevTwoClick] = useState(false);
	const [idAlert, setIdAlert] = useState(false);
	const [passwordAlert, setPasswordAlert] = useState(false);
	const moveBack = useNavigate();

	const insertId = (e) => {
		setId((p) => (p = e.target.value));
		setIdAlert((p) => (p = true));
	};

	const insertPassword = (e) => {
		setPassword((p) => (p = e.target.value));
		setPasswordAlert((p) => (p = true));
	};

	const confirmSignup = async (e) => {
		e.preventDefault();
		if (
			id.length < 21 &&
			id.length > 1 &&
			password.length < 21 &&
			password.length > 1
		) {
			console.log(`id=${id}, password=${password}`);
			try {
				setPrevTwoClick((p) => (p = true));
				const resp = await axios.post('http://localhost:8080/signup', {
					id: id,
					password: password,
				});
			} catch (error) {
				console.log(error);
			}
		} else {
			return;
		}
	};

	const twoClickAlert = () => {
		alert('이미 전송된 요청입니다.');
		moveBack('/');
	};
	console.log(`PrevTwoClick ${PrevTwoClick}`);
	console.log(id, password);
	return (
		<div>
			<RegisterBackground />
			<SignupForm onSubmit={PrevTwoClick ? twoClickAlert : confirmSignup}>
				<div>
					<label htmlFor='id'>아이디</label>
					<input
						id='id'
						onChange={insertId}
						value={id}
						type='text'
						placeholder='5자에서 20자 사이의 영문 소문자'
					/>
					{idAlert ? id ? null : <span>아이디를 입력해주세요</span> : null}
					{id.length > 20 ? <span>id의 길이가 20자 이상입니다.</span> : null}
				</div>
				<div>
					<label htmlFor='password'>비밀번호</label>
					<input
						id='password'
						onChange={insertPassword}
						value={password}
						type='password'
						placeholder='5자에서 20자 사이의 영문 소문자와 숫자'
					/>
					{passwordAlert ? (
						password ? null : (
							<span>비밀번호를 입력해주세요</span>
						)
					) : null}
					{password.length > 20 ? (
						<span>비밀번호의 길이가 20자 이상입니다.</span>
					) : null}
				</div>
				<button>Confirm</button>
			</SignupForm>
		</div>
	);
}

export default Signup;
