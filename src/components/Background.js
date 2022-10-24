import styled, { css } from 'styled-components';
import img from '../assets/bg.svg';

const BackgroundGrad = styled.div`
	width: 100%;
	min-width: 1680px;
	position: absolute;
	z-index: -1000;
	background: linear-gradient(to right, #1d5e66, #249e8e);
	overflow: hidden;
	${(props) =>
		css`
			height: ${props.height}px;
		`};
`;

const BackgroundImg = styled.img`
	width: 100%;
	object-fit: cover;
	filter: drop-shadow(0px 32px 32px rgba(0, 0, 0, 0.35));
`;

function Background({ height }) {
	return (
		<BackgroundGrad height={height}>
			<BackgroundImg src={img} alt='' />
		</BackgroundGrad>
	);
}

Background.defaultProps = {
	height: 'auto',
};

export default Background;
