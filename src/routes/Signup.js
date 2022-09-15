import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterBackground from '../components/RegisterBackground';

const SignupForm = styled.form`
	border-radius: 16px;
	background-color: #fafafa;
	width: 360px;
	margin: 0 auto;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	filter: drop-shadow(4px 8px 24px rgba(50, 167, 151, 1));
	& label {
		color: #404040;
		font-weight: 500;
	}
	& > div {
		margin-bottom: 16px;
		font-size: 1.125rem;
		color: #32a797;
	}
	& > div > div:nth-child(1) {
		border-bottom: 4px solid #32a797;
		width: 96px;
		margin-bottom: 4px;
	}
	& > div > div:nth-child(2) {
		font-size: 2rem;
		color: #404040;
		margin-bottom: 40px;
	}
	& > div > span {
		font-size: 0.825rem;
		font-weight: 400;
		color: orangered;
		display: block;
	}
	& input {
		font-size: 0.825rem;
		display: block;
		width: calc(100% - 40px);
		padding: 12px 20px;
		border: none;
		border-radius: 16px;
		background-color: #e9e9e9;
		margin-top: 16px;
	}
	& input::placeholder {
		font-weight: 00;
	}
	& button {
		width: 100%;
		margin-top: 28px;
	}
`;

const SucSpan = styled.a`
	font-size: 0.825rem;
	font-weight: 500;
	color: #32a797;
	display: block;
`;

const Confirmdiv = styled.div`
	border-radius: 16px;
	background-color: #fafafa;
	font-size: 1rem;
	width: 360px;
	padding: 32px 36px 28px 36px;
	margin: 0 auto;
	position: relative;
	top: 30vh;
	font-weight: 500;
	filter: drop-shadow(4px 8px 24px rgba(50, 167, 151, 1));
	& > span {
		font-size: 1rem;
		display: block;
		font-weight: 400;
		margin-bottom: 36px;
		line-height: 32px;
	}
	& > button {
		width: 100%;
	}
	& > span > div {
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 24px;
	}
	& > span > div > span {
		color: #32c7b2;
	}
`;

function Signup() {
	//HOOK 호출
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [PrevTwoClick, setPrevTwoClick] = useState(false);
	const [idAlert, setIdAlert] = useState(false);
	const [passwordAlert, setPasswordAlert] = useState(false);
	const [idOverlap, setIdOverlap] = useState(-1);
	const [signup, setSignup] = useState(false);
	const [nickname, setNickname] = useState('');
	const [nameOverlap, setNameOverlap] = useState('');
	const [nicknameAlert, setNicknameAlert] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordAlert, setConfirmPasswordAlert] = useState(false);
	const move = useNavigate();
	//정규식 정의
	const special = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
	const blank = /\s/g;
	//onEvent func 처리
	const insertId = (e) => {
		setId((p) => (p = e.target.value));
		setIdAlert((p) => (p = true));
	};

	const insertName = (e) => {
		setNickname((p) => (p = e.target.value));
		setNicknameAlert((p) => (p = true));
	};

	const insertPassword = (e) => {
		setPassword((p) => (p = e.target.value));
		setPasswordAlert((p) => (p = true));
	};

	const insertConfirmPassword = (e) => {
		setConfirmPassword((p) => (p = e.target.value));
		setConfirmPasswordAlert((p) => (p = true));
	};

	const twoClickAlert = () => {
		alert('이미 전송된 요청입니다.');
		move('/');
	};

	const complite = () => {
		move('/login');
	};
	//axios 호출
	const checkIdOverlap = async () => {
		try {
			const resp = await axios.post('http://localhost:8080/check', { id: id });
			console.log(resp.data.overlap);
			setIdOverlap((p) => (p = resp.data.overlap));
		} catch (err) {
			console.log(err);
		}
	};

	const checkNameOverlap = async () => {
		try {
			const req = await axios.post('http://localhost:8080/checkname', {
				name: nickname,
			});
			console.log(req.data.overlap);
			setNameOverlap((p) => (p = req.data.overlap));
		} catch (err) {
			console.log(err);
		}
	};

	const confirmSignup = async (e) => {
		e.preventDefault();
		if (
			id.length < 21 &&
			id.length > 1 &&
			idOverlap === 1 &&
			!id.match(blank) &&
			!id.match(special) &&
			id.toLowerCase() === id &&
			password.length < 21 &&
			password.length > 1 &&
			password.toLowerCase() === password &&
			!password.match(special) &&
			!password.match(blank) &&
			nickname.length < 10 &&
			nickname.length > 0 &&
			!nickname.match(special) &&
			!nickname.match(blank) &&
			nameOverlap === false &&
			confirmPassword === password
		) {
			console.log(`id=${id}, password=${password}`);
			try {
				setPrevTwoClick((p) => (p = true));
				const resp = await axios.post('http://localhost:8080/signup', {
					id: id,
					password: password,
				});
				setSignup((p) => (p = true));
				console.log(resp);
			} catch (error) {
				console.log(error);
			}
		} else if (
			id.length === 0 ||
			password.length === 0 ||
			nickname.length === 0
		) {
			if (id.length === 0) {
				setIdAlert((p) => (p = true));
			}
			if (password.length === 0) {
				setPasswordAlert((p) => (p = true));
			}
			if (nickname.length === 0) {
				setNicknameAlert((p) => (p = true));
			}
		} else if (confirmPassword.length === 0) {
			setConfirmPasswordAlert((p) => (p = true));
		} else {
			return;
		}
	};
	console.log(idOverlap);
	return (
		<div>
			<RegisterBackground />
			{signup ? (
				<Confirmdiv>
					<span>
						<div>
							<span>{id}</span>님,
						</div>
						회원가입을 축하드립니다!
						<br /> 버튼을 눌러 로그인 화면으로 이동하세요!
					</span>
					<button onClick={complite}>로그인하러 가기</button>
				</Confirmdiv>
			) : (
				<SignupForm onSubmit={PrevTwoClick ? twoClickAlert : confirmSignup}>
					<div>
						<div></div>
						<div>회원가입</div>
						<label htmlFor='id'>아이디</label>
						<input
							id='id'
							onChange={insertId}
							onBlur={checkIdOverlap}
							value={id}
							type='text'
							placeholder='5자에서 20자 사이의 영문 소문자와 숫자'
						/>
						{idAlert ? (
							id.length > 20 ? (
								<span>아이디의 길이는 5~20자만 입력 가능합니다.</span>
							) : id.length < 5 && id.length > 0 ? (
								<span>아이디의 길이는 5~20자만 입력 가능합니다.</span>
							) : id.match(special) ? (
								<span>아이디는 소문자와 숫자만 입력 가능합니다.</span>
							) : id.match(blank) ? (
								<span>아이디는 소문자와 숫자만 입력 가능합니다.</span>
							) : !(id.toLowerCase() === id) ? (
								<span>아이디는 소문자와 숫자만 입력 가능합니다.</span>
							) : !id ? (
								<span>아이디를 입력해주세요</span>
							) : idOverlap === 0 ? (
								<span>이미 생성된 아이디 입니다.</span>
							) : idOverlap === 1 ? (
								<SucSpan>사용가능한 아이디 입니다.</SucSpan>
							) : null
						) : null}
					</div>
					<div>
						<label htmlFor='nickname'>닉네임</label>
						<input
							id='nickname'
							type='text'
							value={nickname}
							onBlur={checkNameOverlap}
							onChange={insertName}
							placeholder='10자 이내의 한글, 영문, 숫자'
						/>
						{nicknameAlert ? (
							nickname.length > 10 ? (
								<span>닉네임은 10자 이하만 입력 가능합니다.</span>
							) : nickname.length < 1 ? (
								<span>닉네임을 입력해주세요</span>
							) : nickname.match(special) ? (
								<span>닉네임은 한글, 영문, 숫자만 입력 가능합니다.</span>
							) : nickname.match(blank) ? (
								<span>닉네임은 한글, 영문, 숫자만 입력 가능합니다.</span>
							) : nameOverlap ? (
								<span>이미 생성된 닉네임 입니다.</span>
							) : nameOverlap === false ? (
								<SucSpan>사용가능한 닉네임 입니다.</SucSpan>
							) : null
						) : null}
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
							password.length > 20 ? (
								<span>비밀번호의 길이는 5~20자만 입력 가능합니다.</span>
							) : password.length < 5 && password.length > 0 ? (
								<span>비밀번호의 길이는 5~20자만 입력 가능합니다.</span>
							) : !(password.toLowerCase() === password) ? (
								<span>비밀번호는 소문자와 숫자만 입력 가능합니다.</span>
							) : password.match(special) ? (
								<span>비밀번호는 소문자와 숫자만 입력 가능합니다.</span>
							) : password.match(blank) ? (
								<span>비밀번호는 소문자와 숫자만 입력 가능합니다.</span>
							) : !password ? (
								<span>비밀번호를 입력해주세요</span>
							) : null
						) : null}
					</div>
					<div>
						<label htmlFor='confirmpassword'>비밀번호 확인</label>
						<input
							id='confirmpassword'
							onChange={insertConfirmPassword}
							value={confirmPassword}
							type='password'
						/>
						{confirmPasswordAlert ? (
							confirmPassword.length === 0 ? (
								<span>비밀번호를 한 번 더 입력해주세요</span>
							) : confirmPassword === password ? (
								<SucSpan>비밀번호가 일치합니다.</SucSpan>
							) : (
								<span>비밀번호가 일치하지 않습니다.</span>
							)
						) : null}
					</div>
					<button>완료하고 로그인하기</button>
				</SignupForm>
			)}
		</div>
	);
}

export default Signup;
