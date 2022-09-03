import styled from 'styled-components';
import img from '../assets/bg.svg';

const BackgroundGrad = styled.div`
	width: 100%;
	min-width: 1680px;
	position: absolute;
	z-index: -1000;
	background: linear-gradient(to right, #1d5e66, #249e8e);
`;

const BackgroundImg = styled.img`
	object-fit: cover;
	filter: drop-shadow(0px 32px 32px rgba(0, 0, 0, 0.35));
`;

function Background() {
	return (
		<BackgroundGrad>
			<BackgroundImg src={img} alt='' />
		</BackgroundGrad>
	);
}

export default Background;
