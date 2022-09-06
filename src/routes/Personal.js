import Header from '../components/Header';
import Background from '../components/Background';
import styled, { css, keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import person96 from '../assets/personicon_96.svg';
import { Link, NavLink } from 'react-router-dom';

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
	margin: 0 auto;
	position: relative;
	display: flex;
`;

const FlowerContainer = styled.div`
	width: 580px;
	height: calc(100vh - 50px);
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
	& > div {
		max-width: 580px;
		margin: 0 auto;
		padding-top: 24px;
		font-size: 1.25rem;
		font-weight: 400;
		display: flex;
		justify-content: center;
	}
	& > div > span {
		color: #32a797;
	}
`;

const UserPicture = styled.img`
	display: block;
	width: 96px;
	margin: 0 auto;
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
	color: ${(props) => (props.isSelect === 1 ? '#404040' : '#bcbcbc')};
	height: 60px;
	width: 290px;
	border-radius: 0px;
	padding: 0 0 0 16px;
	margin: 0;
	font-size: 1.5rem;
	font-weight: 500;
	text-align: left;
`;

const FlowerListBtn = styled.button`
	display: inline-block;
	background-color: #fafafa;
	color: ${(props) => (props.isSelect === 1 ? '#bcbcbc' : '#404040')};
	height: 60px;
	width: 290px;
	border-radius: 0px;
	padding: 0 0 0 16px;
	font-size: 1.5rem;
	font-weight: 500;
	text-align: left;
`;

const TodoList = styled.div`
	width: 580px;
	height: 600px;
	background-color: orangered;
	margin-top: 44px;
	animation: ${MoveBox} 1s;
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const FlowerList = styled.div`
	width: 580px;
	height: 600px;
	background-color: skyblue;
	margin-top: 44px;
	animation: ${MoveBox} 1s;
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

function Personal({ isLogin }) {
	const [selectMenu, setSelectMenu] = useState(0);
	const changeMenu = () => {
		setSelectMenu((p) => (p = 1));
	};
	const changeMenuReverse = () => {
		setSelectMenu((p) => (p = 2));
	};
	return (
		<div>
			<Background />
			<PersonalWrapper>
				<FlowerContainer>
					<InnerLogo>
						<Link to='/userhome'>
							<Logo src={logo} alt='' />
						</Link>
					</InnerLogo>
				</FlowerContainer>
				<UserBoard>
					<UserProfile>
						<UserPicture src={person96} alt=''></UserPicture>
						<div>
							<span>{isLogin}</span>님, 환영합니다!
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
								disabled={selectMenu > 1 ? true : false}
							>
								나의 버킷플라워
							</FlowerListBtn>
						</div>
					</BoardMenu>
					{selectMenu === 1 ? <TodoList></TodoList> : <FlowerList></FlowerList>}
				</UserBoard>
			</PersonalWrapper>
		</div>
	);
}

export default Personal;
