import styled from 'styled-components';

const BackgroundGradation = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(to right, #7ff396, #32c7b2);
	z-index: -1000;
	position: absolute;
`;

function RegisterBackground() {
	return <BackgroundGradation></BackgroundGradation>;
}

export default RegisterBackground;
