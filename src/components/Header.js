import styled, { css, keyframes } from 'styled-components';
import img from '../assets/logo.svg';
import person from '../assets/person.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

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
	margin-left: auto;
	/* ${(props) => props.move === '/personal' && LoginStyle(-100)}; */
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
	& a:visited,
	& a:link {
		color: #555555;
	}
`;

const Logo = styled.img`
	/* ${(props) => props.move === '/personal' && LoginStyle(-100)}; */
	animation-timing-function: ease-in-out(0.42, 0, 0.58, 1);
`;

const Person = styled.img`
	width: 96px;
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

// const NavStyle = styled(NavLink)`
// 	color: orange;
// `;

function Header() {
	const location = useLocation();
	return (
		<GlobalNav>
			<Navdiv>
				<Link to='/'>
					<Logo src={img} alt='' move={location.pathname} />
				</Link>
				<LoginBtn move={location.pathname}>
					{location.pathname === '/personal' ? (
						<Person src={person} alt='' />
					) : (
						<NavLink to='/login'>LOGIN</NavLink>
					)}
				</LoginBtn>
			</Navdiv>
		</GlobalNav>
	);
}

export default Header;
