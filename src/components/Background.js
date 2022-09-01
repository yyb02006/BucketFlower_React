import styled from 'styled-components';
import img from '../assets/bg.svg';

const BackImg = styled.img`
	object-fit: cover;
	width: 100%;
	min-width: 1680px;
	position: absolute;
	z-index: -1000;
	filter: drop-shadow(0px 32px 32px rgba(0, 0, 0, 0.35));
`;

function Background() {
	return <BackImg src={img} alt='' />;
}

export default Background;
